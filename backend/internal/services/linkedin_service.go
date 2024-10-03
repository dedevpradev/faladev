package services

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/linkedin"
)

const (
	LINKEDIN_CLIENT_ID     = "78ayhj9r8gh3ce"
	LINKEDIN_CLIENT_SECRET = "Tp7E0Gao0sf34NwY"
	redirectURL            = "http://localhost:8080/callback"
)

var (
	oauth2Config = &oauth2.Config{
		ClientID:     LINKEDIN_CLIENT_ID,
		ClientSecret: LINKEDIN_CLIENT_SECRET,
		Endpoint:     linkedin.Endpoint,
		RedirectURL:  redirectURL,
		Scopes:       []string{"r_liteprofile", "r_emailaddress"},
	}
	logrusLogger = logrus.New()
	state        = "abc123"
)

// Handler to redirect the user to LinkedIn login page
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	url := oauth2Config.AuthCodeURL(state)
	logrusLogger.Debugf("Redirecting to %s", url)
	http.Redirect(w, r, url, http.StatusFound)
}

// Handler for LinkedIn OAuth callback
func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	getstate := r.FormValue("state")
	if getstate != state {
		logrusLogger.Errorf("Invalid state: %s", state)
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	code := r.FormValue("code")
	token, err := oauth2Config.Exchange(context.Background(), code)
	if err != nil {
		logrusLogger.Errorf("Error getting token: %v", err)
		http.Error(w, "Invalid token", http.StatusBadRequest)
		return
	}

	client := oauth2Config.Client(context.Background(), token)

	user, err := getUserInfo(client)
	if err != nil {
		logrusLogger.Errorf("Error getting user info: %v", err)
		http.Error(w, "Invalid user info", http.StatusBadRequest)
		return
	}

	logrusLogger.Debugf("User info: %+v", user)
}

// Fetch LinkedIn user profile
func getUserInfo(client *http.Client) (map[string]interface{}, error) {

	url := "https://api.linkedin.com/v2/me"
	resp, err := client.Get(url)
	if err != nil {
		logrusLogger.Println("Failed to get user info:", err)
		return nil, fmt.Errorf("failed to get user info %w \n ", err)
	}
	defer resp.Body.Close()

	var userData map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		logrusLogger.Println("Failed to decode response:", err)
		return nil, fmt.Errorf("failed to decode response %w \n ", err)
	}

	return userData, nil

}
