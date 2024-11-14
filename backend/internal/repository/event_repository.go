package repository

import (
	"faladev/internal/models"

	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

func NewEventRepository(db *gorm.DB) *EventRepository {
	return &EventRepository{
		db: db,
	}
}

func (eventRepository *EventRepository) CreateEvent(event *models.Event) error {
	return eventRepository.db.Create(event).Error
}

func (eventRepository *EventRepository) GetEventByID(id uint) (*models.Event, error) {
	var event models.Event
	err := eventRepository.db.First(&event, id).Error
	if err != nil {
		return nil, err
	}
	return &event, nil
}

func (eventRepository *EventRepository) UpdateEvent(event *models.Event) error {
	return eventRepository.db.Save(event).Error
}

func (eventRepository *EventRepository) DeleteEvent(id uint) error {
	return eventRepository.db.Delete(&models.Event{}, id).Error
}

func (eventRepository *EventRepository) ListEvents() ([]models.Event, error) {
	var events []models.Event
	err := eventRepository.db.Find(&events).Error
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (eventRepository *EventRepository) GetNextEvent() (*models.Event, error) {
	var event models.Event
	err := eventRepository.db.
		//Where("start_date >= ?", time.Now()).
		Order("start_date, start_time").
		Debug().
		First(&event).Error
	if err != nil {
		return nil, err
	}
	return &event, nil
}

func (eventRepository *EventRepository) CountEvents() (int64, error) {
	var count int64
	err := eventRepository.db.Model(&models.Event{}).Count(&count).Error
	if err != nil {
		return 0, err
	}
	return count, nil
}
