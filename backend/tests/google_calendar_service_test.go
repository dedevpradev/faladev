package services

import (
	"context"
	"faladev/internal/services"
	"testing"

	"github.com/pkg/errors"
	"github.com/stretchr/testify/assert"
	"google.golang.org/api/calendar/v3"
)

func TestFindEventByKey(t *testing.T) {
	tests := []struct {
		name          string
		eventKey      string
		mockDoFunc    func() (*calendar.Event, error)
		expectedEvent *calendar.Event
		expectedError string
	}{
		{
			name:     "Event Found",
			eventKey: "04mti3liihmd9u2agf8hg7kf6u",
			mockDoFunc: func() (*calendar.Event, error) {
				return &calendar.Event{Id: "04mti3liihmd9u2agf8hg7kf6u"}, nil
			},
			expectedEvent: &calendar.Event{Id: "04mti3liihmd9u2agf8hg7kf6u"},
			expectedError: "",
		},
		{
			name:     "Event Not Found",
			eventKey: "https://meet.google.com/non-existent",
			mockDoFunc: func() (*calendar.Event, error) {
				return nil, errors.New("event not found")
			},
			expectedEvent: nil,
			expectedError: "error fetching event with eventKey https://meet.google.com/non-existent: event not found",
		},
		{
			name:     "API Error",
			eventKey: "04mti3liihmd9u2agf8hg7kf6u",
			mockDoFunc: func() (*calendar.Event, error) {
				return nil, errors.New("API error")
			},
			expectedEvent: nil,
			expectedError: "error fetching event with eventKey 04mti3liihmd9u2agf8hg7kf6u: API error",
		},
	}

	for _, tt := range tests {

		t.Run(tt.name, func(t *testing.T) {

			mockService := &FakeCalendarService{
				GetEventMock: func(calendarID, eventID string) services.EventCall {
					assert.Equal(t, "primary", calendarID)
					assert.Equal(t, tt.eventKey, eventID)
					return &FakeEventCall{
						DoFunc: tt.mockDoFunc,
					}
				},
			}

			googleCalendarService := services.GoogleCalendarService{}

			event, err := googleCalendarService.FindEventByKey(context.Background(), mockService, tt.eventKey)

			if tt.expectedError != "" {
				assert.EqualError(t, err, tt.expectedError)
				assert.Error(t, err)
				assert.Nil(t, event)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.expectedEvent, event)
			}
		})
	}
}
