package services

import (
	"fmt"

	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"google.golang.org/api/calendar/v3"
)

func findEventByHangoutLink(calendarService *calendar.Service, hangoutLink string) (*calendar.Event, error) {

	events, err := calendarService.Events.List("primary").Do()

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

func AddGuestToEvent(calendarService *calendar.Service, hangoutLink, email string) (*calendar.Event, error) {

	eventDetails, err := findEventByHangoutLink(calendarService, hangoutLink)

	if err != nil {
		return nil, err
	}

	updatedEvent, err := calendarService.Events.Get("primary", eventDetails.Id).Do()

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

	_, err = calendarService.Events.Update("primary", updatedEvent.Id, updatedEvent).Do()

	if err != nil {
		return nil, errors.Wrap(err, "error adding guest to event")
	}

	log.Infof("Guest %s added to the event %s - Meet: %s\n", email, eventDetails.Id, hangoutLink)

	return updatedEvent, nil
}
