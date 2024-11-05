package services

type StudentRepository interface {
	InsertOrUpdateStudent(name, email, phone string) error
}

type StudentService struct {
	repo StudentRepository
}

func NewStudentService(repo StudentRepository) *StudentService {
	return &StudentService{
		repo: repo,
	}
}

func (studentService *StudentService) InsertOrUpdateStudent(name, email, phone string) error {
	return studentService.repo.InsertOrUpdateStudent(name, email, phone)
}
