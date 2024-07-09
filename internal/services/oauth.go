package services

import (
	"context"
	"faladev/config"
	"faladev/internal/database/models"
	"fmt"
	"net/http"

	"golang.org/x/oauth2"
)

func ExchangeCodeForToken(oauthConfig *oauth2.Config, code string) (*oauth2.Token, error) {
	token, err := oauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("unable to retrieve token from web: %v", err)
	}
	return token, nil
}

func CreateOAuthClient(oauthConfig *oauth2.Config, token *oauth2.Token) (*http.Client, error) {
	client := oauthConfig.Client(context.Background(), token)
	if client == nil {
		return nil, fmt.Errorf("failed to create OAuth client")
	}
	return client, nil
}

func RefreshToken(token *oauth2.Token) (*oauth2.Token, error) {

	ts := config.OAuthConfig.TokenSource(context.Background(), token)

	newToken, err := ts.Token()

	if err != nil {
		return nil, fmt.Errorf("failed to refresh token: %v", err)
	}

	if newToken.AccessToken != token.AccessToken {

		err = models.SaveToken(newToken)

		if err != nil {
			return nil, fmt.Errorf("failed to save new token: %v", err)
		}
	}

	return newToken, nil
}
