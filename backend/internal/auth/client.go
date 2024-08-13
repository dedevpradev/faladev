package auth

import (
	"context"
	"errors"
	"net/http"

	"golang.org/x/oauth2"
)

func CreateOAuthClient(ctx context.Context, oauthConfig *oauth2.Config, token *oauth2.Token) (*http.Client, error) {
	client := oauthConfig.Client(ctx, token)
	if client == nil {
		return nil, errors.New("error creating OAuth client")
	}
	return client, nil
}
