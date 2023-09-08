package entity

import (
	"time"

	"github.com/google/uuid"
)

type SystemsEntity struct {
	ID          uint      `gorm:"column:system_id;primaryKey;autoIncrement"`
	Name        string    `gorm:"column:system_name;type:varchar(20)"`
	Path        string    `gorm:"column:system_path;type:varchar(50)"`
	Description string    `gorm:"column:system_description;type:varchar(255)"`
	SchemeID    uint      `gorm:"column:scheme_id;foreignKey:SchemeID;type:int(11)"`
	ControlID   uint      `gorm:"column:control_id;foreignKey:ControlID;type:int(11)"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime;default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"column:updated_at;autoUpdateTime;default:CURRENT_TIMESTAMP"`
	DeletedAt   time.Time `gorm:"column:deleted_at;autoDeleteTime;default:NULL"`
}

type WorkersEntity struct {
	WorkerUUID uuid.UUID `gorm:"column:worker_uuid;primaryKey"`
	SystemID   uint      `gorm:"column:system_id;foreignKey:SystemID"`
}

type ControlsEntity struct {
	ID        uint      `gorm:"column:control_id;primaryKey;autoIncrement"`
	Type      string    `gorm:"column:control_type;type:varchar(10)"`
	Kp        float64   `gorm:"column:control_kp;type:decimal(7,3);default:null"`
	Ki        float64   `gorm:"column:control_ki;type:decimal(7,3);default:null"`
	Kd        float64   `gorm:"column:control_kd;type:decimal(7,3);default:null"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime;default:CURRENT_TIMESTAMP"`
	DeletedAt time.Time `gorm:"column:deleted_at;autoDeleteTime;default:NULL"`
}

type SchemesEntity struct {
	ID        uint      `gorm:"column:scheme_id;primaryKey;autoIncrement"`
	Setpoint  float64   `gorm:"column:scheme_setpoint;type:decimal(10,3);default:null"`
	MinLevel  float64   `gorm:"column:scheme_min_level;type:decimal(10,3);default:null"`
	MaxLevel  float64   `gorm:"column:scheme_max_level;type:decimal(10,3);default:null"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"column:updated_at;autoUpdateTime;default:CURRENT_TIMESTAMP"`
	DeletedAt time.Time `gorm:"column:deleted_at;autoDeleteTime;default:NULL"`
}
