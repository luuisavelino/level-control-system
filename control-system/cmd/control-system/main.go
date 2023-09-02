package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/pkg/database"
	"github.com/luuisavelino/level-control-system/pkg/messaging"
	"github.com/luuisavelino/level-control-system/pkg/orquestrator"
	"github.com/luuisavelino/level-control-system/src/controllers"
	"github.com/luuisavelino/level-control-system/src/controllers/routes"
	"github.com/luuisavelino/level-control-system/src/models/service"
)

func main() {
	DBconfig := database.DBConfig{}
	db := database.NewDatabase("mysql", DBconfig)
	mysqlConn, err := db.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	MessagingConfig := messaging.MessagingConfig{}
	mqtt := messaging.NewMessaging("mqtt", MessagingConfig)
	mqttConn, err := mqtt.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	manager := orquestrator.NewBasicManager()
	manager.StartMonitoringAndRestart()

	service := service.NewSystemServiceInterface(mysqlConn, mqttConn, manager)
	systemController := controllers.NewSystemControllerInterface(service)

	// TODO: change to New()
	router := gin.Default()

	routes.InitRoutes(&router.RouterGroup, systemController)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
