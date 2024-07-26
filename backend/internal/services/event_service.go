package services

import (
	"faladev/internal/models"
	"faladev/internal/repository"
)

type EventService struct {
	repo *repository.EventRepository
}

func NewEventService(repo *repository.EventRepository) *EventService {
	return &EventService{
		repo: repo,
	}
}

func (s *EventService) CreateEvent(event *models.Event) error {
	return s.repo.CreateEvent(event)
}

func (s *EventService) GetEventByID(id uint) (*models.Event, error) {
	return s.repo.GetEventByID(id)
}

func (s *EventService) UpdateEvent(event *models.Event) error {
	return s.repo.UpdateEvent(event)
}

func (s *EventService) DeleteEvent(id uint) error {
	return s.repo.DeleteEvent(id)
}

func (s *EventService) ListEvents() ([]models.Event, error) {
	return s.repo.ListEvents()
}

func (s *EventService) GetNextEvent() (*models.Event, error) {
	return s.repo.GetNextEvent()
}
