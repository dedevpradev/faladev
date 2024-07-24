package auth

import (
	"context"
	"fmt"

	"golang.org/x/oauth2"
)

func ExchangeCodeForToken(ctx context.Context, oauthConfig *oauth2.Config, code string) (*oauth2.Token, error) {
	token, err := oauthConfig.Exchange(ctx, code)
	if err != nil {
		return nil, fmt.Errorf("unable to retrieve token from web: %v", err)
	}
	return token, nil
}

func RefreshToken(ctx context.Context, oauthConfig *oauth2.Config, token *oauth2.Token) (*oauth2.Token, error) {
	ts := oauthConfig.TokenSource(ctx, token)
	newToken, err := ts.Token()
	if err != nil {
		return nil, fmt.Errorf("failed to refresh token: %v", err)
	}
	return newToken, nil
}
