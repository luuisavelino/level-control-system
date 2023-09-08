package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/repository/entity"
	converter "github.com/luuisavelino/level-control-system/src/models/repository/entity/convert"
)

const (
	SystemsTableName  = "systems"
	WorkersTableName  = "workers"
	ControlsTableName = "controls"
	SchemesTableName  = "schemes"
)

// GetSystem get system by uuid
func (sr systemRepository) GetSystem(ctx context.Context, uuid uuid.UUID) (models.SystemDomainInterface, error) {
	logger.Info("Init SaveWorker")

	tx, err := sr.db.Begin()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	query := `
		SELECT
			si.system_path AS SystemPath,
			c.control_type AS ControlType,
			c.control_kp AS ControlKp,
			c.control_ki AS ControlKi,
			c.control_kd AS ControlKd,
			s.scheme_setpoint AS SchemeSetpoint,
			s.scheme_min_level AS SchemeMinLevel,
			s.scheme_max_level AS SchemeMaxLevel
		FROM ` + WorkersTableName + ` w
		LEFT JOIN ` + SystemsTableName + ` si ON w.system_id = si.system_id
		LEFT JOIN ` + SchemesTableName + ` s ON si.system_id = s.scheme_id
		LEFT JOIN ` + ControlsTableName + ` c ON si.system_id = c.control_id
		WHERE w.worker_uuid = ?
	`

	var systems entity.SystemsEntity
	var schemes entity.SchemesEntity
	var controls entity.ControlsEntity
	err = tx.QueryRow(query, uuid).Scan(
		&systems.Path,
		&controls.Type,
		&controls.Kp,
		&controls.Ki,
		&controls.Kd,
		&schemes.Setpoint,
		&schemes.MinLevel,
		&schemes.MaxLevel,
	)

	if err != nil {
		tx.Rollback()
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	domain := converter.ConvertEntityToDomain(systems, controls, schemes)

	return domain, nil
}
