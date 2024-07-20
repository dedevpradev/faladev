package http

import (
	docs "faladev/cmd/docs"
	"faladev/pkg/handlers"
	"fmt"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
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

	docs.SwaggerInfo.Version = "v1"
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	router.Run(":" + port)
}
