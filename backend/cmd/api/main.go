package main

import (
	"faladev/config"
	"faladev/internal/repository"
	"faladev/internal/services"
	"faladev/pkg/http"
	"fmt"
	"os"

	log "github.com/sirupsen/logrus"

	"faladev/internal/database"

	"golang.org/x/oauth2"
)

func main() {

	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)

	appConfig, err := config.LoadConfig()

	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	appOAuth2Config := appConfig.OAuth2.Config

	db, err := database.InitDB(appConfig.DatabaseURL)

	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	tokenRepo := repository.NewTokenRepository(db)
	studentRepo := repository.NewStudentRepository(db)
	eventRepo := repository.NewEventRepository(db)

	tokenService := services.NewTokenService(tokenRepo)
	studentService := services.NewStudentService(studentRepo)
	eventService := services.NewEventService(eventRepo)

	token, err := tokenService.GetToken()

	if err != nil {
		log.Fatalf("Failed to load token: %v", err)
	}

	if token == nil {
		log.Println("Token not found, redirecting to authentication...")
		fmt.Println("Please visit the following link to authorize your Google account: ", appOAuth2Config.AuthCodeURL("state-token", oauth2.AccessTypeOffline))
	}

	calendarService := services.NewGoogleCalendarService()
	emailService := services.NewGmailService(appOAuth2Config, token)

	http.StartServer(appOAuth2Config, *studentService, calendarService, emailService, *tokenService, *eventService)

}
