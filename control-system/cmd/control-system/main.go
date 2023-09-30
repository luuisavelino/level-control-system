package main

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/internal/api/controllers"
	"github.com/luuisavelino/level-control-system/internal/api/controllers/routes"
	"github.com/luuisavelino/level-control-system/internal/api/models/messaging_action"
	"github.com/luuisavelino/level-control-system/internal/api/models/repository"
	"github.com/luuisavelino/level-control-system/internal/api/models/service"
	"github.com/luuisavelino/level-control-system/internal/config/database"
	"github.com/luuisavelino/level-control-system/internal/config/messaging"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	dbConfig := database.DBConfig{
		Host:               os.Getenv("POSTGRES_HOST"),
		Port:               os.Getenv("POSTGRES_PORT"),
		Dbname:             os.Getenv("POSTGRES_DB_NAME"),
		User:               os.Getenv("POSTGRES_USER"),
		Password:           os.Getenv("POSTGRES_PASSWORD"),
		MaxIdleConns:       10,
		ConnMaxLifetimeSec: 1400,
	}
	db := database.NewDatabase("postgres", dbConfig)
	postgresConn, err := db.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	systemRepository := repository.NewSystemRepository(postgresConn)

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

	mqttActions := messaging_action.NewMqttActions(mqttClient)

	manager := orquestrator.NewBasicManager(mqttActions)
	manager.GoroutineGarbageCollector(time.Second * 10)

	service := service.NewSystemServiceInterface(systemRepository, manager)
	systemController := controllers.NewSystemControllerInterface(service)

	// TODO: change to New()
	router := gin.Default()

	routes.InitRoutes(&router.RouterGroup, systemController)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
