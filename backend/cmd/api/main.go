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
