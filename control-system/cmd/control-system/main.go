package main

import (
	"log"
	"os"
	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/pkg/database"
	"github.com/luuisavelino/level-control-system/pkg/messaging"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/src/controllers"
	"github.com/luuisavelino/level-control-system/src/controllers/routes"
	"github.com/luuisavelino/level-control-system/src/models/service"
)

func main() {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbConfig := database.DBConfig{
		Host:               os.Getenv("DB_HOST"),
		Dbname:             os.Getenv("DB_NAME"),
		User:               os.Getenv("DB_USER"),
		Password:           os.Getenv("DB_PASSWORD"),
		MaxIdleConns:       os.Getenv("DB_MAX_IDLE_CONNS"),
		ConnMaxLifetimeSec: os.Getenv("DB_CONN_MAX_LIFETIME_SEC"),
	}
	db := database.NewDatabase("mysql", dbConfig)
	mysqlConn, err := db.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	messagingConfig := messaging.MessagingConfig{
		Host:     os.Getenv("MQTT_HOST"),
		Port:     os.Getenv("MQTT_PORT"),
		User:     os.Getenv("MQTT_USER"),
		Password: os.Getenv("MQTT_PASSWORD"),
		ClientID: os.Getenv("MQTT_CLIENT_ID"),
	}
	mqtt := messaging.NewMessaging("mqtt", messagingConfig)
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
