package services

import (
	"context"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

type CalendarService interface {
	InitializeService(ctx context.Context, config *oauth2.Config, token *oauth2.Token) (CalendarAPI, error)
	AddGuestToEvent(ctx context.Context, service CalendarAPI, eventKey, email string) (*calendar.Event, error)
	FindEventByKey(ctx context.Context, service CalendarAPI, eventKey string) (*calendar.Event, error)
	CreateEvent(ctx context.Context, service CalendarAPI, event *calendar.Event) (*calendar.Event, error)
}

type CalendarAPI interface {
	EventsList(calendarID string) EventsListCall
	GetEvent(calendarID, eventID string) EventCall
	UpdateEvent(calendarID, eventID string, event *calendar.Event) EventCall
	InsertEvent(calendarID string, event *calendar.Event) EventCall
}

type EventsListCall interface {
	Do() (*calendar.Events, error)
}

type EventCall interface {
	Do() (*calendar.Event, error)
}

type RealCalendarService struct {
	CalendarService *calendar.Service
}

func (rcs *RealCalendarService) EventsList(calendarID string) EventsListCall {
	return &realEventsListCall{
		call: rcs.CalendarService.Events.List(calendarID),
	}
}

func (rcs *RealCalendarService) GetEvent(calendarID, eventID string) EventCall {
	return &realEventCall{
		getCall: rcs.CalendarService.Events.Get(calendarID, eventID),
	}
}

func (rcs *RealCalendarService) UpdateEvent(calendarID, eventID string, event *calendar.Event) EventCall {
	return &realUpdateEventCall{
		updateCall: rcs.CalendarService.Events.Update(calendarID, eventID, event),
	}
}

func (rcs *RealCalendarService) InsertEvent(calendarID string, event *calendar.Event) EventCall {
	return &realInsertEventCall{insertCall: rcs.CalendarService.Events.Insert(calendarID, event)}
}

type realEventsListCall struct {
	call *calendar.EventsListCall
}

func (rel *realEventsListCall) Do() (*calendar.Events, error) {
	return rel.call.Do()
}

type realEventCall struct {
	getCall *calendar.EventsGetCall
}

func (rec *realEventCall) Do() (*calendar.Event, error) {
	return rec.getCall.Do()
}

type realUpdateEventCall struct {
	updateCall *calendar.EventsUpdateCall
}

func (ruc *realUpdateEventCall) Do() (*calendar.Event, error) {
	return ruc.updateCall.Do()
}

type realInsertEventCall struct {
	insertCall *calendar.EventsInsertCall
}

func (ric *realInsertEventCall) Do() (*calendar.Event, error) {
	return ric.insertCall.ConferenceDataVersion(1).Do()
}
