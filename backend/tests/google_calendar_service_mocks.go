package services

import (
	"faladev/internal/services"
	"fmt"

	"google.golang.org/api/calendar/v3"
)

type FakeCalendarService struct {
	EventsListMock  func(calendarID string) services.EventsListCall
	GetEventMock    func(calendarID, eventID string) services.EventCall
	UpdateEventMock func(calendarID, eventID string, event *calendar.Event) services.EventCall
}

func (f *FakeCalendarService) EventsList(calendarID string) services.EventsListCall {
	if f.EventsListMock != nil {
		return f.EventsListMock(calendarID)
	}
	return nil
}

func (f *FakeCalendarService) GetEvent(calendarID, eventID string) services.EventCall {
	if f.GetEventMock != nil {
		return f.GetEventMock(calendarID, eventID)
	}
	return nil
}

func (f *FakeCalendarService) UpdateEvent(calendarID, eventID string, event *calendar.Event) services.EventCall {
	if f.UpdateEventMock != nil {
		return f.UpdateEventMock(calendarID, eventID, event)
	}
	return nil
}

type FakeEventsListCall struct {
	DoFunc func() (*calendar.Events, error)
}

func (f *FakeEventsListCall) Do() (*calendar.Events, error) {
	if f.DoFunc != nil {
		return f.DoFunc()
	}
	return nil, fmt.Errorf("Do function not implemented")
}

type FakeEventCall struct {
	DoFunc func() (*calendar.Event, error)
}

func (f *FakeEventCall) Do() (*calendar.Event, error) {
	if f.DoFunc != nil {
		return f.DoFunc()
	}
	return nil, fmt.Errorf("Do function not implemented")
}
