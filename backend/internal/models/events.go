package models

import (
	"time"

	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Location    string    `json:"location"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
	Organizer   string    `json:"organizer"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
}
