package config

import (
	"errors"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/gmail/v1"
)

type OAuth2Config struct {
	Config *oauth2.Config
	Token  *oauth2.Token
}

type Config struct {
	DatabaseURL string
	OAuth2      OAuth2Config
}

func getDatabaseURL() string {
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("Please set the DATABASE_URL environment variable")
	}
	return databaseURL
}

func getOAuthConfig() *oauth2.Config {

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

func LoadConfig() (*Config, error) {

	err := godotenv.Load()

	if err != nil {
		return nil, errors.New("failed to load environment variables")
	}

	oauthConfig := getOAuthConfig()
	databaseURL := getDatabaseURL()

	return &Config{
		DatabaseURL: databaseURL,
		OAuth2:      OAuth2Config{Config: oauthConfig},
	}, nil
}
