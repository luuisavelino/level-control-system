package repository

import (
	"time"
)

type System struct {
	ID          uint `gorm:"primaryKey;autoIncrement"`
	Name        string
	Path        string
	Description string
	SchemeID    uint
	ControlID   uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   time.Time
}

type Worker struct {
	WorkerUUID string `gorm:"primaryKey"`
	SystemID   uint
	System     System `gorm:"foreignKey:SystemID"`
}

type Control struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	Type      string
	Kp        float64
	Ki        float64
	Kd        float64
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
}

type Scheme struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	Setpoint  float64
	MinLevel  float64
	MaxLevel  float64
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time
}
