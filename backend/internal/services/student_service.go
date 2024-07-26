package services

import (
	"faladev/internal/repository"
)

type StudentService struct {
	repo *repository.StudentRepository
}

func NewStudentService(repo *repository.StudentRepository) *StudentService {
	return &StudentService{
		repo: repo,
	}
}

func (s *StudentService) InsertOrUpdateStudent(name, email, phone string) error {
	return s.repo.InsertOrUpdateStudent(name, email, phone)
}
