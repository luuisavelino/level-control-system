package database

import (
	"fmt"
	"os"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api"
)

type DBConfig struct {
	Host               string
	Port               string
	Dbname             string
	User               string
	Password           string
	Organization       string
	Bucket             string
	MaxOpenConns       int
	MaxIdleConns       int
	ConnMaxLifetimeSec int
}

type Database interface {
	NewConnection() (api.WriteAPI, error)
}

func NewDatabase(databse string, dbConfig DBConfig) Database {
	switch databse {
	case "influxdb":
		return influxDatabase{dbConfig}
	default:
		return nil
	}
}

type influxDatabase struct {
	config DBConfig
}

func (influx influxDatabase) NewConnection() (api.WriteAPI, error) {
	dsn := fmt.Sprintf("http://%s:%s",
		influx.config.Host,
		influx.config.Port,
	)

	influxdbToken := os.Getenv("INFLUXDB_TOKEN")

	client := influxdb2.NewClient(dsn, influxdbToken)
	writeAPI := client.WriteAPI(influx.config.Organization, influx.config.Bucket)

	return writeAPI, nil
}
