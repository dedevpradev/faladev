package services

import (
	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

type EmailService interface { // Interface que define os métodos que devem ser implementados por um serviço de e-mail
	SendMentorshipInvitation(recipient string, eventDetails *calendar.Event, token *oauth2.Token) error
}
