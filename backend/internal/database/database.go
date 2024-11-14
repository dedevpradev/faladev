package database

import (
	"log"
	"os"
	"sync"
	"time"

	_ "github.com/lib/pq"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	db   *gorm.DB
	once sync.Once
)

func GetDB() *gorm.DB {

	once.Do(func() {

		databaseURL := os.Getenv("DATABASE_URL")

		if databaseURL == "" {
			log.Fatal("DATABASE_URL environment variable not set")
		}

		var err error

		db, err = gorm.Open(postgres.Open(databaseURL), &gorm.Config{})

		if err != nil {
			panic("failed to connect to database")
		}

		sqlDB, err := db.DB()

		if err != nil {
			panic("failed to get database connection handle")
		}

		sqlDB.SetMaxIdleConns(20)
		sqlDB.SetMaxOpenConns(200)
		sqlDB.SetConnMaxLifetime(time.Hour)

	})

	return db
}
