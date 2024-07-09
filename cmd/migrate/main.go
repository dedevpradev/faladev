package main

import (
	"faladev/internal/database"
	"faladev/internal/models"
	"fmt"
	"log"
)

func main() {

	fmt.Println("Starting migration...")

	db := database.GetDB()

	db.Exec("CREATE DATABASE faladev;")

	db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

	errStudents := db.AutoMigrate(&models.Student{})

	if errStudents != nil {
		log.Fatalf("Failed to migrate students: %v", errStudents)
	}

	errToken := db.AutoMigrate(&models.Token{})

	if errToken != nil {
		log.Fatalf("Failed to migrate students: %v", errToken)
	}

	fmt.Println("Migration completed successfully!")
}
