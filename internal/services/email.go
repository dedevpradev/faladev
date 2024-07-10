package services

import (
	"bytes"
	"faladev/pkg/utils"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/gmail/v1"
)

func SendMailMentorship(recipient string, eventDetails *calendar.Event, tok *oauth2.Token, client *http.Client) error {

	srv, err := gmail.New(client)

	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
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
