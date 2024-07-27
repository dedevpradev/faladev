package services

import (
	"context"
	"faladev/internal/auth"
	"faladev/internal/repository"
	"fmt"

	"golang.org/x/oauth2"
)

type TokenService struct {
	repo *repository.TokenRepository
}

func NewTokenService(repo *repository.TokenRepository) *TokenService {
	return &TokenService{
		repo: repo,
	}
}

func (ts *TokenService) CreateToken(token *oauth2.Token) error {
	return ts.repo.CreateToken(token)
}

func (ts *TokenService) GetToken() (*oauth2.Token, error) {
	return ts.repo.GetToken()
}

func (ts *TokenService) ValidateOrRefreshToken(ctx context.Context, config *oauth2.Config) (*oauth2.Token, error) {

	token, err := ts.GetToken()

	if err != nil {
		return nil, fmt.Errorf("failed to load token: %w", err)
	}

	if !token.Valid() {

		token, err = auth.RefreshToken(ctx, config, token)

		if err != nil {
			return nil, fmt.Errorf("failed to refresh token: %w", err)
		}

		if err := ts.CreateToken(token); err != nil {
			return nil, fmt.Errorf("failed to save token: %w", err)
		}
	}

	return token, nil
}
