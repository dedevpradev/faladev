package services

import (
	"fmt"

	"google.golang.org/api/calendar/v3"
)

func AddGuestToEvent(calendarService *calendar.Service, hangoutLink, email string) (*calendar.Event, error) {

	events, err := calendarService.Events.List("primary").Do()
	if err != nil {
		return nil, fmt.Errorf("error listing events: %v", err)
	}

	var eventDetails *calendar.Event
	for _, event := range events.Items {
		if event.HangoutLink == hangoutLink {
			eventDetails = event
			break
		}
	}

	if eventDetails == nil {
		return nil, fmt.Errorf("event with HangoutLink %s not found", hangoutLink)
	}

	updatedEvent, err := calendarService.Events.Get("primary", eventDetails.Id).Do()

	if err != nil {
		return nil, fmt.Errorf("Error getting event details: %v", err)
	}

	attendee := &calendar.EventAttendee{Email: email}

	updatedEvent.Attendees = append(updatedEvent.Attendees, attendee)

	_, err = calendarService.Events.Update("primary", updatedEvent.Id, updatedEvent).Do()

	if err != nil {
		return nil, fmt.Errorf("Error adding guest to event: %v", err)
	}

	fmt.Printf("Convidado %s adicionado ao evento %s - Meet: %s\n", email, eventDetails.Id, hangoutLink)

	return updatedEvent, nil
}
