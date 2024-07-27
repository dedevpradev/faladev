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

func (r *EventRepository) CreateEvent(event *models.Event) error {
	return r.db.Create(event).Error
}

func (r *EventRepository) GetEventByID(id uint) (*models.Event, error) {
	var event models.Event
	err := r.db.First(&event, id).Error
	if err != nil {
		return nil, err
	}
	return &event, nil
}

func (r *EventRepository) UpdateEvent(event *models.Event) error {
	return r.db.Save(event).Error
}

func (r *EventRepository) DeleteEvent(id uint) error {
	return r.db.Delete(&models.Event{}, id).Error
}

func (r *EventRepository) ListEvents() ([]models.Event, error) {
	var events []models.Event
	err := r.db.Find(&events).Error
	if err != nil {
		return nil, err
	}
	return events, nil
}

func (r *EventRepository) GetNextEvent() (*models.Event, error) {
	var event models.Event
	err := r.db.
		//Where("start_date >= ?", time.Now()).
		Order("start_date, start_time").
		Debug().
		First(&event).Error
	if err != nil {
		return nil, err
	}
	return &event, nil
}
