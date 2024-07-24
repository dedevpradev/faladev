package services

import (
	"context"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

type CalendarService interface { // Interface que define os métodos que devem ser implementados por um serviço de calendário
	InitializeService(ctx context.Context, config *oauth2.Config, token *oauth2.Token) (CalendarAPI, error)
	AddGuestToEvent(ctx context.Context, service CalendarAPI, hangoutLink, email string) (*calendar.Event, error)
	FindEventByHangoutLink(ctx context.Context, service CalendarAPI, hangoutLink string) (*calendar.Event, error)
}

type CalendarAPI interface {
	EventsList(calendarID string) EventsListCall
	GetEvent(calendarID, eventID string) EventCall
	UpdateEvent(calendarID, eventID string, event *calendar.Event) EventCall
}

type EventsListCall interface {
	Do() (*calendar.Events, error)
}

type EventCall interface {
	Do() (*calendar.Event, error)
}

type RealCalendarService struct {
	GoogleCalendar *calendar.Service
}

func (rcs *RealCalendarService) EventsList(calendarID string) EventsListCall {
	return &realEventsListCall{
		call: rcs.GoogleCalendar.Events.List(calendarID),
	}
}

func (rcs *RealCalendarService) GetEvent(calendarID, eventID string) EventCall {
	return &realEventCall{
		getCall: rcs.GoogleCalendar.Events.Get(calendarID, eventID),
	}
}

func (rcs *RealCalendarService) UpdateEvent(calendarID, eventID string, event *calendar.Event) EventCall {
	return &realUpdateEventCall{
		updateCall: rcs.GoogleCalendar.Events.Update(calendarID, eventID, event),
	}
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
