package http

import (
	"context"
	docs "faladev/cmd/docs"
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
	"google.golang.org/api/calendar/v3"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Error string
}

type App struct {
	config          *oauth2.Config
	calendarService services.CalendarService
	emailService    services.EmailService
	studentService  services.StudentService
	tokenService    services.TokenService
	eventService    services.EventService
}

func NewApp(config *oauth2.Config, calendar services.CalendarService, email services.EmailService, studentService services.StudentService, tokenService services.TokenService, eventService services.EventService) *App {
	return &App{
		config:          config,
		calendarService: calendar,
		emailService:    email,
		studentService:  studentService,
		tokenService:    tokenService,
		eventService:    eventService,
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

	name, email, phone := c.PostForm("name"), c.PostForm("email"), c.PostForm("phone")

	if err := app.insertOrUpdateStudent(name, email, phone); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	token, err := app.validateOrRefreshToken(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	eventDetails, err := app.addGuestToNextEvent(c.Request.Context(), email, token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := app.sendInvite(email, eventDetails, token); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Redirect(http.StatusSeeOther, eventDetails.Location)
}

func (app *App) insertOrUpdateStudent(name, email, phone string) error {
	if err := app.studentService.InsertOrUpdateStudent(name, email, phone); err != nil {
		return fmt.Errorf("error inserting record into database: %w", err)
	}
	return nil
}

func (app *App) validateOrRefreshToken(ctx context.Context) (*oauth2.Token, error) {
	token, err := app.tokenService.ValidateOrRefreshToken(ctx, app.config)
	if err != nil {
		return nil, fmt.Errorf("failed to ensure valid token: %w", err)
	}
	return token, nil
}

func (app *App) initializeCalendarService(ctx context.Context, token *oauth2.Token) (*services.CalendarAPI, error) {
	calendarService, err := app.calendarService.InitializeService(ctx, app.config, token)
	if err != nil {
		return nil, fmt.Errorf("error initializing Google Calendar service: %w", err)
	}
	return &calendarService, nil
}

func (app *App) getNextEvent() (*models.Event, error) {
	event, err := app.eventService.GetNextEvent()
	if err != nil {
		return nil, fmt.Errorf("error getting next event: %w", err)
	}
	return event, nil
}

func (app *App) addGuestToEvent(ctx context.Context, calendarService *services.CalendarAPI, eventKey, email string) (*calendar.Event, error) {
	eventDetails, err := app.calendarService.AddGuestToEvent(ctx, *calendarService, eventKey, email)
	if err != nil {
		return nil, fmt.Errorf("error adding guest to event: %w", err)
	}
	return eventDetails, nil
}

func (app *App) addGuestToNextEvent(ctx context.Context, email string, token *oauth2.Token) (*models.Event, error) {

	calendarService, err := app.initializeCalendarService(ctx, token)

	if err != nil {
		return nil, err
	}

	event, err := app.getNextEvent()

	if err != nil {
		return nil, err
	}

	_, err = app.addGuestToEvent(ctx, calendarService, event.Key, email)

	if err != nil {
		return nil, err
	}

	return event, nil
}

func (app *App) sendInvite(email string, eventDetails *models.Event, token *oauth2.Token) error {
	if err := app.emailService.SendInvite(email, eventDetails, token); err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}
	return nil
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

	err = app.tokenService.CreateToken(token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Unable to save token: %v", err)})
		return
	}

	fmt.Println("OAuth2 configured successfully with redirect URL:", app.config.RedirectURL)

	c.Redirect(http.StatusSeeOther, "/")
}

func StartServer(appOAuth2Config *oauth2.Config, studentService services.StudentService, calendarService services.CalendarService, emailService services.EmailService, tokenService services.TokenService, eventService services.EventService) {

	app := NewApp(appOAuth2Config, calendarService, emailService, studentService, tokenService, eventService)

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
