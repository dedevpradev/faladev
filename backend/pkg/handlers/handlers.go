package handlers

import (
	"context"
	"fmt"
	"html/template"
	"net/http"

	"github.com/gin-gonic/gin"

	"faladev/config"
	"faladev/internal/models"
	"faladev/internal/services"
)

type ErrorResponse struct {
	Error string
}

// FormHandler handles the form page.
// @Summary Render form page
// @Description Renders the form.html page to display user information form.
// @Produce html
// @Success 200 {string} html "HTML content of the form page"
// @Router /form [get]
func FormHandler(c *gin.Context) {
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
// @Router /event-handler [post]
func EventHandler(c *gin.Context) {

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
		token, err = services.RefreshToken(token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh token: " + err.Error()})
			return
		}
	}

	calendarService, err := services.InitializeCalendarService(context.Background(), config.OAuthConfig, token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error initializing Google Calendar service: " + err.Error()})
		return
	}

	eventDetails, err := services.AddGuestToEvent(calendarService, config.GetEventGoogleMeet(), email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting event details: " + err.Error()})
		return
	}

	client, err := services.CreateOAuthClient(config.OAuthConfig, token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create OAuth client: " + err.Error()})
		return
	}

	if err = services.SendMailMentorship(email, eventDetails, token, client); err != nil {
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
// @Router /oauth/callback [get]
func OAuthCallbackHandler(c *gin.Context) {

	if c.Query("state") != "state-token" {
		c.JSON(http.StatusBadRequest, &ErrorResponse{
			Error: "State token doesn't match",
		})
		return
	}

	code := c.Query("code")

	token, err := config.OAuthConfig.Exchange(context.Background(), code)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Unable to retrieve token from web: %v", err)})
		return
	}

	err = models.SaveToken(token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Unable to save token: %v", err)})
		return
	}

	fmt.Println("OAuth2 configured successfully with redirect URL:", config.OAuthConfig.RedirectURL)

	c.Redirect(http.StatusSeeOther, "/")
}
