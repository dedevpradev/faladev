package database

import (
	"log"
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

func InitDB(databaseURL string) (*gorm.DB, error) {

	var err error

	once.Do(func() {

		db, err = gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
		if err != nil {
			log.Printf("failed to connect to database: %v", err)
			return
		}

		sqlDB, err := db.DB()
		if err != nil {
			log.Printf("failed to get database connection handle: %v", err)
			return
		}

		sqlDB.SetMaxIdleConns(20)
		sqlDB.SetMaxOpenConns(200)
		sqlDB.SetConnMaxLifetime(time.Hour)
	})

	if err != nil {
		return nil, err
	}

	return db, nil
}
