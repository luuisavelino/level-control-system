package entity

import (
	"time"

	"github.com/google/uuid"
)

type SystemsEntity struct {
	ID          int64     `db:"system_id;primaryKey;autoIncrement"`
	Name        string    `db:"system_name;type:varchar(20)"`
	Path        string    `db:"system_path;type:varchar(50)"`
	Description string    `db:"system_description;type:varchar(255)"`
	SchemeID    int64     `db:"scheme_id;foreignKey:SchemeID;type:int(11)"`
	ControlID   int64     `db:"control_id;foreignKey:ControlID;type:int(11)"`
	CreatedAt   time.Time `db:"created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `db:"updated_at;default:CURRENT_TIMESTAMP"`
	DeletedAt   time.Time `db:"deleted_at;default:NULL"`
}

type WorkersEntity struct {
	WorkerUUID uuid.UUID `db:"worker_uuid;primaryKey"`
	SystemID   int64     `db:"system_id;foreignKey:SystemID"`
}

type ControlsEntity struct {
	ID        int64     `db:"control_id;primaryKey;autoIncrement"`
	Type      string    `db:"control_type;type:varchar(10)"`
	Kp        float64   `db:"control_kp;type:decimal(7,3);default:null"`
	Ki        float64   `db:"control_ki;type:decimal(7,3);default:null"`
	Kd        float64   `db:"control_kd;type:decimal(7,3);default:null"`
	CreatedAt time.Time `db:"created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `db:"updated_at;default:CURRENT_TIMESTAMP"`
	DeletedAt time.Time `db:"deleted_at;default:NULL"`
}

type SchemesEntity struct {
	ID        int64     `db:"scheme_id;primaryKey;autoIncrement"`
	Setpoint  float64   `db:"scheme_setpoint;type:decimal(10,3);default:null"`
	MinLevel  float64   `db:"scheme_min_level;type:decimal(10,3);default:null"`
	MaxLevel  float64   `db:"scheme_max_level;type:decimal(10,3);default:null"`
	CreatedAt time.Time `db:"created_at;default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `db:"updated_at;default:CURRENT_TIMESTAMP"`
	DeletedAt time.Time `db:"deleted_at;default:NULL"`
}
