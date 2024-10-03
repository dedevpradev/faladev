package models

import (
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	Token string
}
