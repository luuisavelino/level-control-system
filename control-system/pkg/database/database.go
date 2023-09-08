package database

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
)

type DBConfig struct {
	Host               string
	Dbname             string
	User               string
	Password           string
	Port               int
	MaxIdleConns       int
	ConnMaxLifetimeSec int
}

type Database interface {
	NewConnection() (*sql.DB, error)
}

func NewDatabase(databse string, dbConfig DBConfig) Database {
	switch databse {
	case "mysql":
		return mySQLDatabase{dbConfig}
	default:
		return nil
	}
}

type mySQLDatabase struct {
	config DBConfig
}

func (my mySQLDatabase) NewConnection() (*sql.DB, error) {
	fmt.Println(my.config)
	cfg := mysql.Config{
		Addr:                 my.config.Host,
		User:                 my.config.User,
		Passwd:               my.config.Password,
		DBName:               my.config.Dbname,
		Net:                  "tcp",
		Loc:                  time.Local,
		AllowNativePasswords: true,
		ParseTime:            true,
		Params: map[string]string{
			"charset": "utf8",
		},
	}

	dsn := cfg.FormatDSN()

	fmt.Println(dsn)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}
