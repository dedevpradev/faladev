package database

import (
	"faladev/internal/models"
	"log"
	"time"

	"gorm.io/gorm"
)

func Seed(db *gorm.DB) {
	seedEvents(db)
}

func seedEvents(db *gorm.DB) {

	var eventCount int64

	db.Model(&models.Event{}).Count(&eventCount)

	if eventCount == 0 {

		log.Println("Inserting default event...")

		defaultEvent := models.Event{
			Name:        "Mentoria (Carreira e Tecnologia)",
			Description: "",
			Location:    "https://meet.google.com/eam-bqde-mgd",
			StartDate:   time.Now().Add(24 * time.Hour),
			EndDate:     time.Now().Add(26 * time.Hour),
			StartTime:   time.Now().Add(24 * time.Hour),
			EndTime:     time.Now().Add(26 * time.Hour),
			Organizer:   "",
			Email:       "",
			Phone:       "",
		}

		if err := db.Create(&defaultEvent).Error; err != nil {
			log.Fatalf("Failed to insert default event: %v", err)
		}

		log.Println("Default event inserted successfully!")
	}
}
