package auth

import (
	"context"
	"fmt"
	"net/http"

	"golang.org/x/oauth2"
)

func CreateOAuthClient(ctx context.Context, oauthConfig *oauth2.Config, token *oauth2.Token) (*http.Client, error) {
	client := oauthConfig.Client(ctx, token)
	if client == nil {
		return nil, fmt.Errorf("failed to create OAuth client")
	}
	return client, nil
}
