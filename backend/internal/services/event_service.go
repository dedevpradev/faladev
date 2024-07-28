package services

import (
	"faladev/internal/models"
)

type EventRepository interface {
	CreateEvent(event *models.Event) error
	GetEventByID(id uint) (*models.Event, error)
	UpdateEvent(event *models.Event) error
	DeleteEvent(id uint) error
	ListEvents() ([]models.Event, error)
	GetNextEvent() (*models.Event, error)
	CountEvents() (int64, error)
}

type EventService struct {
	repo EventRepository
}

func NewEventService(repo EventRepository) *EventService {
	return &EventService{repo: repo}
}

func (eventService *EventService) CreateEvent(event *models.Event) error {
	return eventService.repo.CreateEvent(event)
}

func (eventService *EventService) GetEventByID(id uint) (*models.Event, error) {
	return eventService.repo.GetEventByID(id)
}

func (eventService *EventService) UpdateEvent(event *models.Event) error {
	return eventService.repo.UpdateEvent(event)
}

func (eventService *EventService) DeleteEvent(id uint) error {
	return eventService.repo.DeleteEvent(id)
}

func (eventService *EventService) ListEvents() ([]models.Event, error) {
	return eventService.repo.ListEvents()
}

func (eventService *EventService) GetNextEvent() (*models.Event, error) {
	return eventService.repo.GetNextEvent()
}

func (eventService *EventService) CountEvents() (int64, error) {
	return eventService.repo.CountEvents()
}
