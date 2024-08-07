package services

import (
	"context"
	"faladev/internal/models"
	"time"

	"github.com/google/uuid"
	"google.golang.org/api/calendar/v3"
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
	repo            EventRepository
	calendarService CalendarService
}

func NewEventService(repo EventRepository, calendarService CalendarService) *EventService {
	return &EventService{
		repo:            repo,
		calendarService: calendarService,
	}
}

func (eventService *EventService) CreateEvent(ctx context.Context, api *CalendarAPI, event *models.Event) error {

	if api == nil {
		return nil
	}

	eventCalendar := &calendar.Event{
		Summary:     event.Name,
		Description: event.Description,
		Start: &calendar.EventDateTime{
			DateTime: event.StartTime.Format(time.RFC3339),
			TimeZone: "America/Sao_Paulo",
		},
		End: &calendar.EventDateTime{
			DateTime: event.EndTime.Format(time.RFC3339),
			TimeZone: "America/Sao_Paulo",
		},
		ConferenceData: &calendar.ConferenceData{
			CreateRequest: &calendar.CreateConferenceRequest{
				RequestId: uuid.New().String(),
				ConferenceSolutionKey: &calendar.ConferenceSolutionKey{
					Type: "hangoutsMeet",
				},
			},
		},
	}

	newEvent, err := eventService.calendarService.CreateEvent(ctx, *api, eventCalendar)

	if err != nil {
		return err
	}

	event.Key = newEvent.Id
	event.Location = newEvent.HangoutLink
	event.CalendarEventLink = newEvent.HtmlLink

	if err := eventService.repo.CreateEvent(event); err != nil {
		return err
	}

	return nil
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
