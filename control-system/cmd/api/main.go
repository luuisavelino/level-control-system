package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/service"
	"github.com/luuisavelino/level-control-system/controllers"
)

func main() {
	// TODO: mqtt connection

	service := service.NewSystemServiceInterface()
	systemController := controllers.NewSystemControllerInterface(service)

	// TODO: change to New()
	router := gin.Default()

	routes.InitRoutes(&router.RouterGroup, systemController)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
