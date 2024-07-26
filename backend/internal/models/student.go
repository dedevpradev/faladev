package models

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	Name  string
	Email string
	Phone string
}
