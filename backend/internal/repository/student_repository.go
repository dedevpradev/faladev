package repository

import (
	"faladev/internal/models"

	"gorm.io/gorm"
)

type StudentRepository struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) *StudentRepository {
	return &StudentRepository{
		db: db,
	}
}

func (r *StudentRepository) InsertOrUpdateStudent(name, email, phone string) error {

	var existingStudent models.Student

	err := r.db.Where("email = ?", email).First(&existingStudent).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			newStudent := models.Student{
				Name:  name,
				Email: email,
				Phone: phone,
			}
			result := r.db.Create(&newStudent)
			return result.Error
		}
		return err
	}

	existingStudent.Name = name
	existingStudent.Phone = phone

	result := r.db.Save(&existingStudent)

	return result.Error
}
