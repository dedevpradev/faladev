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

func FormHandler(c *gin.Context) {
	tmpl, err := template.ParseFiles("templates/web/form.html")

	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("error parsing template: %v", err))
		return
	}
	
	tmpl.Execute(c.Writer, nil)
}

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

func OAuthCallbackHandler(c *gin.Context) {

	if c.Query("state") != "state-token" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "State token doesn't match"})
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
