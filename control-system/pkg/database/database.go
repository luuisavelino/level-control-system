package database

import (
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type DBConfig struct {
	Host               string
	Dbname             string
	User               string
	Password           string
	MaxIdleConns       int
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

	db, err := gorm.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return nil, err
	}

	db.DB().SetMaxIdleConns(my.config.MaxIdleConns)
	db.DB().SetConnMaxLifetime(time.Second * time.Duration(my.config.ConnMaxLifetimeSec))

	return db, nil
}
