package main

import (
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/internal/api/controllers"
	"github.com/luuisavelino/level-control-system/internal/api/middleware"
	"github.com/luuisavelino/level-control-system/internal/api/models/repository"
	"github.com/luuisavelino/level-control-system/internal/api/models/service"
	"github.com/luuisavelino/level-control-system/internal/api/routes"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/pkg/database"
	"github.com/luuisavelino/level-control-system/pkg/messaging"
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
	mqtt, err := messaging.NewMessaging("mqtt", messagingConfig)
	if err != nil {
		log.Fatal(err)
	}

	manager := orquestrator.NewBasicManager(mqtt)
	manager.GoroutineGarbageCollector(time.Second * 10)

	service := service.NewSystemServiceInterface(systemRepository, manager)
	systemController := controllers.NewSystemControllerInterface(service)

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(middleware.LoggerMiddleware())
	router.Use(middleware.AuthMiddleware())

	routes.InitRoutes(&router.RouterGroup, systemController)

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
