package services

import (
	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

type EmailService interface {
	SendMentorshipInvitation(recipient string, eventDetails *calendar.Event, token *oauth2.Token) error
}
