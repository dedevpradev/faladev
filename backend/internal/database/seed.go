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
			Name:              "Mentoria (Carreira e Tecnologia)",
			Key:               "04mti3liihmd9u2agf8hg7kf6u",
			Description:       "Essa é uma mentoria gratuita para quem está entrando na área de tecnologia, migrando de área ou buscando crescimento profissional.",
			Location:          "https://meet.google.com/eam-bqde-mgd",
			StartDate:         time.Now().Add(24 * time.Hour),
			EndDate:           time.Now().Add(26 * time.Hour),
			StartTime:         time.Now().Add(24 * time.Hour),
			EndTime:           time.Now().Add(26 * time.Hour),
			Organizer:         "Marcos Fonseca",
			Email:             "mentoria@faladev.tech",
			Phone:             "",
			CalendarEventLink: "https://www.google.com/calendar/event?eid=MDRtdGkzbGlpaG1kOXUyYWdmOGhnN2tmNnVfMjAyNDA2MTJUMjIwMDAwWiBjb250YXRvQG1hcmNvc2ZvbnNlY2EuY29tLmJy",
		}

		if err := db.Create(&defaultEvent).Error; err != nil {
			log.Fatalf("Failed to insert default event: %v", err)
		}

		log.Println("Default event inserted successfully!")
	}
}
