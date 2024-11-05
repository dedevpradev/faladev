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

func (studentRepository *StudentRepository) InsertOrUpdateStudent(name, email, phone string) error {

	student := &models.Student{Name: name, Email: email, Phone: phone}

	err := studentRepository.db.Where("email = ?", email).FirstOrCreate(&student).Error

	if err != nil {
		return err
	}

	student.Name = name
	student.Phone = phone

	result := studentRepository.db.Save(&student)

	return result.Error
}
