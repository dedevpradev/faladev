package main

import (
	"faladev/config"
	"faladev/internal/models"
	"faladev/pkg/http"
	"fmt"

	log "github.com/sirupsen/logrus"

	"golang.org/x/oauth2"
)

func main() {

	config.SetupOAuthConfig()

	_, err := models.LoadToken()

	if err != nil {

		log.Println("Token not found, redirecting to authentication...")
		fmt.Println("Please visit the following link to authorize your Google account: ", config.OAuthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline))
	}

	http.StartServer()
}
