package main

import (
	"faladev/config"
	"faladev/internal/models"
	"faladev/pkg/http"
	"fmt"

	log "github.com/sirupsen/logrus"

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

	oauthConfig := config.SetupOAuthConfig()

	token, err := models.LoadToken()

	if err != nil {
		log.Fatal(err)
	}

	if token == nil {
		log.Println("Token not found, redirecting to authentication...")
		fmt.Println("Please visit the following link to authorize your Google account: ", oauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline))
	}

	appAuthConfig := config.AuthConfig{
		Config: oauthConfig,
		Token:  token,
	}

	http.StartServer(appAuthConfig)

}
