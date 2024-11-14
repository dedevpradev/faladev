package services

import (
	"bytes"
	"context"
	"faladev/internal/models"
	"faladev/pkg/utils"
	"fmt"
	"html/template"

	"golang.org/x/oauth2"
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

func (gmailService *GmailService) SendInvite(recipient string, eventDetails *models.Event, token *oauth2.Token) error {

	ctx := context.Background()

	client := gmailService.config.Client(ctx, token)

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))

	if err != nil {
		return fmt.Errorf("unable to retrieve Gmail client: %w", err)
	}

	emailFrom := fmt.Sprintf("%s <%s>", eventDetails.Organizer, eventDetails.Email)
	subject := fmt.Sprintf("Convite para %s", eventDetails.Name)

	body, err := gmailService.getEmailBody("templates/email/mentorship.html", eventDetails)

	if err != nil {
		return fmt.Errorf("failed to compose email body: %w", err)
	}

	fullEmail := gmailService.buildEmailMessage(emailFrom, recipient, subject, body)

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

func (gmailService *GmailService) getEmailBody(templatePath string, eventDetails *models.Event) (string, error) {

	tmpl, err := template.ParseFiles(templatePath)

	if err != nil {
		return "", fmt.Errorf("error loading template: %w", err)
	}

	var body bytes.Buffer

	if err := tmpl.Execute(&body, eventDetails); err != nil {
		return "", fmt.Errorf("error executing template: %w", err)
	}

	return body.String(), nil
}

func (gmailService *GmailService) buildEmailMessage(from, to, subject, body string) string {
	return fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nContent-Type: text/html; charset=\"UTF-8\"\r\n\r\n%s",
		from, to, subject, body)
}
