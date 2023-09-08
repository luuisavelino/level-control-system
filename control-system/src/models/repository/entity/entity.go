package entity

import (
	"time"

	"github.com/google/uuid"
)

type SystemsEntity struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	Name        string    `gorm:"type:varchar(20)"`
	Path        string    `gorm:"type:varchar(50)"`
	Description string    `gorm:"type:varchar(255)"`
	SchemeID    uint      `gorm:"foreignKey:SchemeID"`
	ControlID   uint      `gorm:"foreignKey:ControlID"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
	DeletedAt   time.Time `gorm:"autoDeleteTime"`
}

type WorkersEntity struct {
	WorkerUUID uuid.UUID `gorm:"primaryKey"`
	SystemID   uint      `gorm:"foreignKey:SystemID"`
}

type ControlsEntity struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"`
	Type      string    `gorm:"type:varchar(10)"`
	Kp        float64   `gorm:"type:decimal(7,3);default:null"`
	Ki        float64   `gorm:"type:decimal(7,3);default:null"`
	Kd        float64   `gorm:"type:decimal(7,3);default:null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	DeletedAt time.Time `gorm:"autoDeleteTime"`
}

type SchemesEntity struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"`
	Setpoint  float64   `gorm:"type:decimal(10,3);default:null"`
	MinLevel  float64   `gorm:"type:decimal(10,3);default:null"`
	MaxLevel  float64   `gorm:"type:decimal(10,3);default:null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	DeletedAt time.Time `gorm:"autoDeleteTime"`
}
