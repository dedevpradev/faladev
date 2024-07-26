package http

import (
	"context"
	docs "faladev/cmd/docs"
	"faladev/config"
	"faladev/internal/auth"
	"faladev/internal/models"
	"faladev/internal/services"
	"fmt"
	"html/template"
	"net/http"
	"os"

	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"golang.org/x/oauth2"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Error string
}

type App struct {
	config          *oauth2.Config
	calendarService services.CalendarService
	emailService    services.EmailService
}

func NewApp(config *oauth2.Config, calendar services.CalendarService, email services.EmailService) *App {
	return &App{
		config:          config,
		calendarService: calendar,
		emailService:    email,
	}
}

// FormHandler handles the form page.
// @Summary Render form page
// @Description Renders the form.html page to display user information form.
// @Produce html
// @Success 200 {string} html "HTML content of the form page"
// @Router / [get]
func (app *App) FormHandler(c *gin.Context) {

	tmpl, err := template.ParseFiles("templates/web/form.html")

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("error parsing template: %v", err))
		return
	}

	tmpl.Execute(c.Writer, nil)
}

// EventHandler handles the event handling endpoint.
// @Summary Handle event creation and interaction
// @Description Handles event creation, guest addition, email sending, and redirects to Google Meet link.
// @Accept json
// @Produce json
// @Param name formData string true "Name of the student"
// @Param email formData string true "Email of the student"
// @Param phone formData string true "Phone number of the student"
// @Success 303 {string} string "Redirects to Google Meet link"
// @Failure 400 {object} ErrorResponse "No Google Meet link available or other errors"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /event [post]
func (app *App) EventHandler(c *gin.Context) {

	name := c.PostForm("name")
	email := c.PostForm("email")
	phone := c.PostForm("phone")

	if err := models.InsertOrUpdateStudent(name, email, phone); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error inserting record into database: " + err.Error()})
		return
	}

	token, err := models.LoadToken()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load token: " + err.Error()})
		return
	}

	if !token.Valid() {

		token, err = auth.RefreshToken(c.Request.Context(), app.config, token)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh token: " + err.Error()})
			return
		}

		err = models.SaveToken(token)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save token: " + err.Error()})
			return
		}
	}

	calendarService, err := app.calendarService.InitializeService(context.Background(), app.config, token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error initializing Google Calendar service: " + err.Error()})
		return
	}

	eventID := config.GetEventGoogleMeet()
	eventDetails, err := app.calendarService.AddGuestToEvent(context.Background(), calendarService, eventID, email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting event details: " + err.Error()})
		return
	}

	if err = app.emailService.SendMentorshipInvitation(email, eventDetails, token); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email: " + err.Error()})
		return
	}

	if eventDetails.HangoutLink == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No Google Meet link available for this event"})
		return
	}

	c.Redirect(http.StatusSeeOther, eventDetails.HangoutLink)
}

// OAuthCallbackHandler handles the OAuth2 callback endpoint.
// @Summary Handle OAuth2 callback
// @Description Exchange code for token and save it
// @Accept  json
// @Produce  json
// @Param state query string true "State token"
// @Param code query string true "Authorization code"
// @Success 303  "Redirects to /"
// @Failure 400 {object} ErrorResponse "State token doesn't match"
// @Failure 500 {object} ErrorResponse "Unable to retrieve or save token"
// @Router /callback [get]
func (app *App) OAuthCallbackHandler(c *gin.Context) {

	if c.Query("state") != "state-token" {
		c.JSON(http.StatusBadRequest, &ErrorResponse{
			Error: "State token doesn't match",
		})
		return
	}

	code := c.Query("code")

	token, err := auth.ExchangeCodeForToken(c.Request.Context(), app.config, code)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Unable to retrieve token from web: %v", err)})
		return
	}

	err = models.SaveToken(token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Unable to save token: %v", err)})
		return
	}

	fmt.Println("OAuth2 configured successfully with redirect URL:", app.config.RedirectURL)

	c.Redirect(http.StatusSeeOther, "/")
}

func StartServer(appAuthConfig config.AuthConfig) {

	app := NewApp(appAuthConfig.Config, services.NewGoogleCalendarService(), services.NewGmailService(appAuthConfig.Config, appAuthConfig.Token))

	router := gin.Default()

	router.GET("/", app.FormHandler)
	router.GET("/callback", app.OAuthCallbackHandler)
	router.POST("/event", app.EventHandler)

	router.Static("/static/", "static")

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	fmt.Println("Running server on port " + port)

	docs.SwaggerInfo.Version = "v1"
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	router.Run(":" + port)
}
