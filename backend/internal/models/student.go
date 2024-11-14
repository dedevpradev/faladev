package models

import (
	"faladev/internal/database"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	Name  string
	Email string
	Phone string
}

func InsertOrUpdateStudent(name, email, phone string) error {

	db := database.GetDB()

	var existingStudent Student
	err := db.Where("email = ?", email).First(&existingStudent).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			newStudent := Student{
				Name:  name,
				Email: email,
				Phone: phone,
			}
			result := db.Create(&newStudent)
			return result.Error
		}

		return err
	}

	existingStudent.Name = name
	existingStudent.Phone = phone

	result := db.Save(&existingStudent)
	return result.Error
}
