package services

import (
	"context"
	"fmt"

	"golang.org/x/oauth2"
	"google.golang.org/api/calendar/v3"
)

var Token *oauth2.Token

func InitializeCalendarService(ctx context.Context, config *oauth2.Config, token *oauth2.Token) (*calendar.Service, error) {
	client := config.Client(ctx, token)
	service, err := calendar.New(client)
	if err != nil {
		return nil, fmt.Errorf("erro ao criar o serviço do Google Calendar: %v", err)
	}
	return service, nil
}
