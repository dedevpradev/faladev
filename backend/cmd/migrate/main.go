package main

import (
	"faladev/config"
	"faladev/internal/database"
	"faladev/internal/models"
	"fmt"
	"log"
)

func main() {

	fmt.Println("Starting migration...")

	appConfig, err := config.LoadConfig()

	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	db, err := database.InitDB(appConfig.DatabaseURL)

	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

	errStudents := db.AutoMigrate(&models.Student{})

	if errStudents != nil {
		log.Fatalf("Failed to migrate students: %v", errStudents)
	}

	errToken := db.AutoMigrate(&models.Token{})

	if errToken != nil {
		log.Fatalf("Failed to migrate tokens: %v", errToken)
	}

	errEvent := db.AutoMigrate(&models.Event{})

	if errEvent != nil {
		log.Fatalf("Failed to migrate events: %v", errEvent)
	}

	fmt.Println("Migration completed successfully!")

	database.Seed(db)

	fmt.Println("Seed completed successfully!")
}
