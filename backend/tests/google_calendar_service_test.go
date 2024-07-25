package services

import (
	"context"
	"faladev/internal/services"
	"testing"

	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"google.golang.org/api/calendar/v3"
)

func TestFindEventByHangoutLink(t *testing.T) {
	tests := []struct {
		name          string
		hangoutLink   string
		mockDoFunc    func() (*calendar.Events, error)
		expectedEvent *calendar.Event
		expectedError string
	}{
		{
			name:        "Event Found",
			hangoutLink: "https://meet.google.com/xxx-yyyy-zzz",
			mockDoFunc: func() (*calendar.Events, error) {
				return &calendar.Events{
					Items: []*calendar.Event{
						{HangoutLink: "https://meet.google.com/xxx-yyyy-zzz"},
					},
				}, nil
			},
			expectedEvent: &calendar.Event{HangoutLink: "https://meet.google.com/xxx-yyyy-zzz"},
			expectedError: "",
		},
		{
			name:        "Event Not Found",
			hangoutLink: "https://meet.google.com/non-existent",
			mockDoFunc: func() (*calendar.Events, error) {
				return &calendar.Events{
					Items: []*calendar.Event{
						{HangoutLink: "https://meet.google.com/xxx-yyyy-zzz"},
					},
				}, nil
			},
			expectedEvent: nil,
			expectedError: "event with HangoutLink https://meet.google.com/non-existent not found",
		},
		{
			name:        "API Error",
			hangoutLink: "https://meet.google.com/xxx-yyyy-zzz",
			mockDoFunc: func() (*calendar.Events, error) {
				return nil, errors.New("API error")
			},
			expectedEvent: nil,
			expectedError: "error listing events: API error",
		},
	}

	for _, tt := range tests {

		t.Run(tt.name, func(t *testing.T) {
			mockService := &FakeCalendarService{
				EventsListMock: func(calendarID string) services.EventsListCall {
					return &FakeEventsListCall{
						DoFunc: tt.mockDoFunc,
					}
				},
			}

			gcs := services.GoogleCalendarService{}

			event, err := gcs.FindEventByHangoutLink(context.Background(), mockService, tt.hangoutLink)

			if tt.expectedError != "" {
				log.Infof("Error: %v", err)
				log.Info("Event: ", event)
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
