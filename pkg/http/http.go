package http

import (
	"faladev/pkg/handlers"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func StartServer() {

	router := gin.Default()

	router.GET("/", handlers.FormHandler)
	router.GET("/callback", handlers.OAuthCallbackHandler)
	router.POST("/event", handlers.EventHandler)

	router.Static("/static/", "static")

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	fmt.Println("Running server on port " + port)

	router.Run(":" + port)
}
