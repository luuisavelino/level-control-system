package database

import (
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type DBConfig struct {
	host               string
	dbname             string
	user               string
	password           string
	maxIdleConns       int
	ConnMaxLifetimeSec int
}

type Database interface {
	NewConnection() (*gorm.DB, error)
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

func (my mySQLDatabase) NewConnection() (*gorm.DB, error) {
	cfg := mysql.Config{
		Addr:                 my.config.host,
		User:                 my.config.user,
		Passwd:               my.config.password,
		DBName:               my.config.dbname,
		Net:                  "tcp",
		Loc:                  time.Local,
		AllowNativePasswords: true,
		ParseTime:            true,
		Params: map[string]string{
			"charset": "utf8",
		},
	}

	db, err := gorm.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return nil, err
	}

	db.DB().SetMaxIdleConns(my.config.maxIdleConns)
	db.DB().SetConnMaxLifetime(time.Second * time.Duration(my.config.ConnMaxLifetimeSec))

	return db, nil
}
