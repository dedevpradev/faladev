package services

import (
	"bytes"
	"context"
	"faladev/pkg/utils"
	"fmt"
	"html/template"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

type GmailService struct {
	config *oauth2.Config
	token  *oauth2.Token
}

func NewGmailService(config *oauth2.Config, token *oauth2.Token) EmailService {
	return &GmailService{
		config: config,
		token:  token,
	}
}

func (gs *GmailService) SendInvite(recipient string, eventDetails *calendar.Event, token *oauth2.Token) error {

	ctx := context.Background()

	client := gs.config.Client(ctx, token)

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))

	if err != nil {
		return fmt.Errorf("unable to retrieve Gmail client: %w", err)
	}

	emailFrom := "Marcos Fonseca <contato@marcosfonseca.com.br>"
	subject := "Convite para Mentoria em Carreira e Tecnologia"

	body, err := gs.getEmailBody("templates/email/mentorship.html", eventDetails)

	if err != nil {
		return fmt.Errorf("failed to compose email body: %w", err)
	}

	fullEmail := gs.buildEmailMessage(emailFrom, recipient, subject, body)

	encodedEmail := utils.Base64URLEncode([]byte(fullEmail))

	message := &gmail.Message{
		Raw: encodedEmail,
	}

	_, err = srv.Users.Messages.Send("me", message).Do()
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}

func (gs *GmailService) getEmailBody(templatePath string, eventDetails *calendar.Event) (string, error) {

	tmpl, err := template.ParseFiles(templatePath)

	if err != nil {
		return "", fmt.Errorf("error loading template: %w", err)
	}

	data := struct {
		HangoutLink string
		HtmlLink    string
	}{
		HangoutLink: eventDetails.HangoutLink,
		HtmlLink:    eventDetails.HtmlLink,
	}

	var body bytes.Buffer

	if err := tmpl.Execute(&body, data); err != nil {
		return "", fmt.Errorf("error executing template: %w", err)
	}

	return body.String(), nil
}

func (gs *GmailService) buildEmailMessage(from, to, subject, body string) string {
	return fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nContent-Type: text/html; charset=\"UTF-8\"\r\n\r\n%s",
		from, to, subject, body)
}
