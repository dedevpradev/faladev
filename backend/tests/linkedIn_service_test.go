package services

import (
	"fmt"

	"github.com/sirupsen/logrus"
)

type MockLinkedInService struct {
	LoginFunc       func() string
	CallbackFunc    func(state string, code string) (map[string]interface{}, error)
	GetUserInfoFunc func(token string) (map[string]interface{}, error)
}

// Login method simulates redirecting to LinkedIn for login
func (m *MockLinkedInService) Login() string {
	if m.LoginFunc != nil {
		return m.LoginFunc()
	}
	return "mock-login-url"
}

// Callback method simulates handling the callback from LinkedIn
func (m *MockLinkedInService) Callback(state string, code string) (map[string]interface{}, error) {
	if m.CallbackFunc != nil {
		return m.CallbackFunc(state, code)
	}
	return nil, fmt.Errorf("mock callback error")
}

// GetUserInfo method simulates fetching user information
func (m *MockLinkedInService) GetUserInfo(token string) (map[string]interface{}, error) {
	if m.GetUserInfoFunc != nil {
		return m.GetUserInfoFunc(token)
	}
	return nil, fmt.Errorf("mock user info error")
}

// Example of using the mock service
func ExampleUsage() {
	mockService := &MockLinkedInService{
		LoginFunc: func() string {
			return "https://mock.linkedin.com/auth?code=123&state=abc123"
		},
		CallbackFunc: func(state string, code string) (map[string]interface{}, error) {
			if state != "abc123" {
				return nil, fmt.Errorf("invalid state")
			}
			return map[string]interface{}{
				"firstName": "John",
				"lastName":  "Doe",
				"email":     "john.doe@example.com",
			}, nil
		},
		GetUserInfoFunc: func(token string) (map[string]interface{}, error) {
			return map[string]interface{}{
				"id":        "12345",
				"firstName": "John",
				"lastName":  "Doe",
				"email":     "john.doe@example.com",
			}, nil
		},
	}

	// Simulating login
	loginURL := mockService.Login()
	logrus.Infof("Login URL: %s", loginURL)

	// Simulating callback handling
	userInfo, err := mockService.Callback("abc123", "mock-code")
	if err != nil {
		logrus.Errorf("Error in callback: %v", err)
		return
	}
	logrus.Infof("User info: %+v", userInfo)

	// Simulating fetching user info
	user, err := mockService.GetUserInfo("mock-token")
	if err != nil {
		logrus.Errorf("Error getting user info: %v", err)
		return
	}
	logrus.Infof("Fetched user: %+v", user)
}
