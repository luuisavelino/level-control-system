package main

import (
	"log"
	"os"
	"time"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/joho/godotenv"
	"github.com/luuisavelino/level-control-system/database-application/pkg/database"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	dbConfig := database.DBConfig{
		Host:               os.Getenv("INFLUXDB_HOST"),
		Port:               os.Getenv("INFLUXDB_PORT"),
		Dbname:             os.Getenv("INFLUXDB_DB_NAME"),
		User:               os.Getenv("INFLUXDB_USER"),
		Password:           os.Getenv("INFLUXDB_PASSWORD"),
		Organization:       os.Getenv("INFLUXDB_ORGANIZATION"),
		Bucket:             os.Getenv("INFLUXDB_BUCKET"),
		MaxOpenConns:       10,
		MaxIdleConns:       10,
		ConnMaxLifetimeSec: 1400,
	}
	db := database.NewDatabase("postgres", dbConfig)
	influxdbConn, err := db.NewConnection()
	if err != nil {
		log.Fatal(err)
	}

	influxdbConn.WritePoint(
		influxdb2.NewPoint(
			"temperature",
			map[string]string{
				"sensor": "sensor-1",
			},
			map[string]interface{}{
				"value": 10.0,
			},
			time.Now(),
		),
	)
}
