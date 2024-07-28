package services

import (
	"faladev/internal/models"

	"golang.org/x/oauth2"
)

type EmailService interface {
	SendInvite(recipient string, eventDetails *models.Event, token *oauth2.Token) error
}
