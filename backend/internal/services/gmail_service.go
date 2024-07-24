package services

import (
	"bytes"
	"context"
	"faladev/pkg/utils"
	"fmt"
	"html/template"
	"log"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

type GmailService struct {
	config *oauth2.Config
	token  *oauth2.Token
}

func NewGmailService(config *oauth2.Config, token *oauth2.Token) EmailService { // Construtor responsável por encapsular a criação de uma instância de GmailService e retornar um ponteiro para ela
	return &GmailService{
		config: config,
		token:  token,
	}
}

func (gs *GmailService) SendMentorshipInvitation(recipient string, eventDetails *calendar.Event, token *oauth2.Token) error { // Método que envia um convite de mentoria por e-mail

	ctx := context.Background()
	client := gs.config.Client(ctx, token)

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))

	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
		return fmt.Errorf("Unable to retrieve Gmail client: %v", err)
	}

	emailTo := recipient
	emailFrom := "Marcos Fonseca <contato@marcosfonseca.com.br>"
	subject := "Convite para Mentoria em Carreira e Tecnologia"

	tmpl, err := template.ParseFiles("templates/email/mentorship.html")

	if err != nil {
		log.Fatalf("Error loading template: %v", err)
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
		log.Fatalf("Error executing template: %v", err)
	}

	emailHeader := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nContent-Type: text/html; charset=\"UTF-8\"\r\n\r\n",
		emailFrom, emailTo, subject)

	fullEmail := emailHeader + body.String()

	encodedEmail := utils.Base64URLEncode([]byte(fullEmail))

	var message gmail.Message
	message.Raw = encodedEmail

	_, err = srv.Users.Messages.Send("me", &message).Do()

	if err != nil {
		return fmt.Errorf("failed to send email: %v", err)
	}

	return nil
}
