package main

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/pkg/database"
	"github.com/luuisavelino/level-control-system/pkg/messaging"
	"github.com/luuisavelino/level-control-system/src/controllers"
	"github.com/luuisavelino/level-control-system/src/controllers/routes"
	"github.com/luuisavelino/level-control-system/src/models/service"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	dbConfig := database.DBConfig{
		Host:               os.Getenv("MYSQL_HOST"),
		Dbname:             os.Getenv("MYSQL_DB_NAME"),
		User:               os.Getenv("MYSQL_USER"),
		Password:           os.Getenv("MYSQL_PASSWORD"),
		MaxIdleConns:       10,
		ConnMaxLifetimeSec: 1400,
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
	mqttClient, err := mqtt.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	mqttActions := mqtt_actions.NewMqttActions(mqttClient)

	manager := orquestrator.NewBasicManager(mqttActions)
	manager.StartMonitoring(time.Second * 10)

	service := service.NewSystemServiceInterface(mysqlConn, manager)
	systemController := controllers.NewSystemControllerInterface(service)

	// TODO: change to New()
	router := gin.Default()

	routes.InitRoutes(&router.RouterGroup, systemController)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
