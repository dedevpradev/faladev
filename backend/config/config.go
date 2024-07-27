package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/gmail/v1"
)

type AuthConfig struct {
	Config *oauth2.Config
	Token  *oauth2.Token
}

func GetEventGoogleMeet() string {

	meetEvent := os.Getenv("GOOGLE_MEET_EVENT")

	if meetEvent == "" {
		log.Fatal("Please set the GOOGLE_MEET_EVENT environment variable")
	}

	return meetEvent
}

func SetupOAuthConfig() *oauth2.Config {

	err := godotenv.Load()

	if err != nil {
		log.Printf("Warning: No .env file found, reading from environment variables. Error: %v", err)
	}

	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	redirectURL := os.Getenv("GOOGLE_REDIRECT_URL")

	if clientID == "" || clientSecret == "" || redirectURL == "" {
		log.Fatal("Please set the GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URL environment variables")
	}

	return &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{gmail.GmailSendScope, calendar.CalendarScope},
		Endpoint:     google.Endpoint,
	}
}
