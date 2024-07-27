package services

import (
	"context"
	"faladev/internal/auth"
	"fmt"

	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

type GoogleCalendarService struct{}

func NewGoogleCalendarService() CalendarService {
	return &GoogleCalendarService{}
}

func (gcs *GoogleCalendarService) InitializeService(ctx context.Context, config *oauth2.Config, token *oauth2.Token) (CalendarAPI, error) {

	client, err := auth.CreateOAuthClient(ctx, config, token)

	if err != nil {
		return nil, fmt.Errorf("error creating OAuth client: %v", err)
	}

	service, err := calendar.NewService(ctx, option.WithHTTPClient(client))

	if err != nil {
		return nil, fmt.Errorf("error creating calendar service: %v", err)
	}
	return &RealCalendarService{GoogleCalendar: service}, nil
}

func (gcs *GoogleCalendarService) FindEventByHangoutLink(ctx context.Context, api CalendarAPI, hangoutLink string) (*calendar.Event, error) {

	events, err := api.EventsList("primary").Do()

	if err != nil {
		return nil, errors.Wrap(err, "error listing events")
	}

	for _, event := range events.Items {
		if event.HangoutLink == hangoutLink {
			return event, nil
		}
	}

	return nil, fmt.Errorf("event with HangoutLink %s not found", hangoutLink)
}

func (gcs *GoogleCalendarService) AddGuestToEvent(ctx context.Context, api CalendarAPI, hangoutLink, email string) (*calendar.Event, error) {

	eventDetails, err := gcs.FindEventByHangoutLink(ctx, api, hangoutLink)

	if err != nil {
		return nil, err
	}

	updatedEvent, err := api.GetEvent("primary", eventDetails.Id).Do()

	if err != nil {
		return nil, errors.Wrap(err, "error getting event details")
	}

	for _, attendee := range updatedEvent.Attendees {
		if attendee.Email == email {
			log.Infof("Guest %s is already in the event %s - Meet: %s\n", email, eventDetails.Id, hangoutLink)
			return updatedEvent, nil
		}
	}

	attendee := &calendar.EventAttendee{Email: email}

	updatedEvent.Attendees = append(updatedEvent.Attendees, attendee)

	_, err = api.UpdateEvent("primary", updatedEvent.Id, updatedEvent).Do()

	if err != nil {
		return nil, errors.Wrap(err, "error adding guest to event")
	}

	log.Infof("Guest %s added to the event %s - Meet: %s\n", email, eventDetails.Id, hangoutLink)

	return updatedEvent, nil
}
