package models

import (
	"encoding/json"
	"faladev/internal/database"

	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	Token string
}

func SaveToken(token *oauth2.Token) error {

	db := database.GetDB()

	tokenJSON, err := json.Marshal(token)

	if err != nil {
		return err
	}

	newToken := Token{
		Token: string(tokenJSON),
	}

	return db.Create(&newToken).Error
}

func LoadToken() (*oauth2.Token, error) {

	db := database.GetDB()

	var tokenModel Token

	err := db.Order("created_at desc").First(&tokenModel).Error

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
