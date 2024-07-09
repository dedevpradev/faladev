package config

import (
	"log"
	"os"
)

func GetEventGoogleMeet() string {

	meetEvent := os.Getenv("GOOGLE_MEET_EVENT")

	if meetEvent == "" {
		log.Fatal("Please set the GOOGLE_MEET_EVENT environment variable")
	}

	return meetEvent
}
