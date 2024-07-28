package repository

import (
	"encoding/json"
	"faladev/internal/models"

	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

type TokenRepository struct {
	db *gorm.DB
}

func NewTokenRepository(db *gorm.DB) *TokenRepository {
	return &TokenRepository{
		db: db,
	}
}

func (tokenRepository *TokenRepository) CreateToken(token *oauth2.Token) error {

	tokenJSON, err := json.Marshal(token)

	if err != nil {
		return err
	}

	newToken := models.Token{
		Token: string(tokenJSON),
	}

	return tokenRepository.db.Create(&newToken).Error
}

func (tokenRepository *TokenRepository) GetToken() (*oauth2.Token, error) {

	var tokenModel models.Token

	err := tokenRepository.db.Order("created_at desc").First(&tokenModel).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}

	var token oauth2.Token

	err = json.Unmarshal([]byte(tokenModel.Token), &token)

	if err != nil {
		return nil, err
	}

	return &token, nil
}
