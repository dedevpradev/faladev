package services

import (
	"faladev/internal/repository"

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

func (s *TokenService) CreateToken(token *oauth2.Token) error {
	return s.repo.CreateToken(token)
}

func (s *TokenService) GetToken() (*oauth2.Token, error) {
	return s.repo.GetToken()
}
