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

// @title           Faladev API
// @version         1.0
// @description     Esta é uma API exemplo do Faladev, que integra com o Google Calendar e o Gmail.
// @termsOfService  http://swagger.io/terms/

// @contact.name   Suporte da API Faladev
// @contact.url    http://www.faladev.com/support
// @contact.email  support@faladev.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /

// @securityDefinitions.oauth2  OAuth2
// @securityDefinitions.oauth2.description  OAuth2 authorization for accessing the API
// @securityDefinitions.oauth2.flow  accessCode

// @externalDocs.description  OpenAPI Specification
// @externalDocs.url          https://swagger.io/resources/open-api/
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

	calendarService := services.NewGoogleCalendarService()

	tokenRepo := repository.NewTokenRepository(db)
	studentRepo := repository.NewStudentRepository(db)
	eventRepo := repository.NewEventRepository(db)

	tokenService := services.NewTokenService(tokenRepo)
	studentService := services.NewStudentService(studentRepo)
	eventService := services.NewEventService(eventRepo, calendarService)

	token, err := tokenService.GetToken()

	if err != nil {
		log.Fatalf("Failed to load token: %v", err)
	}

	if token == nil {
		log.Println("Token not found, redirecting to authentication...")
		fmt.Println("Please visit the following link to authorize your Google account: ", appOAuth2Config.AuthCodeURL("state-token", oauth2.AccessTypeOffline))
	}

	emailService := services.NewGmailService(appOAuth2Config, token)

	app := http.NewApp(appOAuth2Config, calendarService, emailService, *studentService, *tokenService, *eventService)

	app.StartServer()

}
