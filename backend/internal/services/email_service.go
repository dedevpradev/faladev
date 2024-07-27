package services

import (
	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

type EmailService interface {
	SendInvite(recipient string, eventDetails *calendar.Event, token *oauth2.Token) error
}
