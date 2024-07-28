package services

import (
	"context"
	"faladev/internal/auth"
	"fmt"

	"golang.org/x/oauth2"
)

type TokenRepository interface {
	CreateToken(token *oauth2.Token) error
	GetToken() (*oauth2.Token, error)
}

type TokenService struct {
	repo TokenRepository
}

func NewTokenService(repo TokenRepository) *TokenService {
	return &TokenService{
		repo: repo,
	}
}

func (tokenService *TokenService) CreateToken(token *oauth2.Token) error {
	return tokenService.repo.CreateToken(token)
}

func (tokenService *TokenService) GetToken() (*oauth2.Token, error) {
	return tokenService.repo.GetToken()
}

func (tokenService *TokenService) ValidateOrRefreshToken(ctx context.Context, config *oauth2.Config) (*oauth2.Token, error) {

	token, err := tokenService.GetToken()

	if err != nil {
		return nil, fmt.Errorf("failed to load token: %w", err)
	}

	if !token.Valid() {

		token, err = auth.RefreshToken(ctx, config, token)

		if err != nil {
			return nil, fmt.Errorf("failed to refresh token: %w", err)
		}

		if err := tokenService.CreateToken(token); err != nil {
			return nil, fmt.Errorf("failed to save token: %w", err)
		}
	}

	return token, nil
}
