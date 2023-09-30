package entity

import (
	"database/sql"

	"github.com/google/uuid"
)

type SystemsEntity struct {
	ID        sql.NullInt32  `db:"system_id;primaryKey;autoIncrement"`
	Path      sql.NullString `db:"system_path;type:varchar(50)"`
	SchemeID  sql.NullInt32  `db:"scheme_id;foreignKey:SchemeID;type:int(11)"`
	ControlID sql.NullInt32  `db:"control_id;foreignKey:ControlID;type:int(11)"`
}

type WorkersEntity struct {
	WorkerUUID uuid.UUID     `db:"worker_uuid;primaryKey"`
	SystemID   sql.NullInt32 `db:"system_id;foreignKey:SystemID"`
}

type ControlsEntity struct {
	ID   sql.NullInt32   `db:"control_id;primaryKey;autoIncrement"`
	Type sql.NullString  `db:"control_type;type:varchar(10)"`
	Kp   sql.NullFloat64 `db:"control_kp;type:decimal(7,3);default:null"`
	Ki   sql.NullFloat64 `db:"control_ki;type:decimal(7,3);default:null"`
	Kd   sql.NullFloat64 `db:"control_kd;type:decimal(7,3);default:null"`
}

type SchemesEntity struct {
	ID       sql.NullInt32   `db:"scheme_id;primaryKey;autoIncrement"`
	Setpoint sql.NullFloat64 `db:"scheme_setpoint;type:decimal(10,3);default:null"`
	MinLevel sql.NullFloat64 `db:"scheme_min_level;type:decimal(10,3);default:null"`
	MaxLevel sql.NullFloat64 `db:"scheme_max_level;type:decimal(10,3);default:null"`
}
