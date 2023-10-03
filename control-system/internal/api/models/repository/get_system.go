package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/api/models"
	"github.com/luuisavelino/level-control-system/internal/api/models/repository/entity"
	converter "github.com/luuisavelino/level-control-system/internal/api/models/repository/entity/converter"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

const (
	SystemsTableName  = "systems"
	WorkersTableName  = "workers"
	ControlsTableName = "controls"
	SchemesTableName  = "schemes"
)

// GetSystem get system by uuid
func (sr systemRepository) GetSystem(ctx context.Context, uuid uuid.UUID) (models.SystemDomainInterface, error) {
	logger.Info("Init GetSystem repository",
		zap.String("journey", "Repository"),
	)

	tx := sr.db.Begin()

	query := `
		SELECT
			si.path AS SystemPath,
			c.type AS ControlType,
			c.kp AS ControlKp,
			c.ki AS ControlKi,
			c.kd AS ControlKd,
			s.setpoint AS SchemeSetpoint,
			s.min_level AS SchemeMinLevel,
			s.max_level AS SchemeMaxLevel
		FROM ` + SystemsTableName + ` si
		LEFT JOIN ` + SchemesTableName + ` s ON s.uuid = si.scheme_uuid
		LEFT JOIN ` + ControlsTableName + ` c ON c.uuid = si.control_uuid
		WHERE si.uuid = ?;
	`

	var systems entity.SystemsEntity
	var schemes entity.SchemesEntity
	var controls entity.ControlsEntity
	row := tx.Raw(query, uuid).Row()
	err := row.Scan(
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

	err = tx.Commit().Error
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	domain := converter.ConvertEntityToDomain(systems, controls, schemes)

	logger.Info("Get system with success",
		zap.String("journey", "Repository"),
	)

	return domain, nil
}
