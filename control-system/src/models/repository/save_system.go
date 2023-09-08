package repository

import (
	"context"

	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	converter "github.com/luuisavelino/level-control-system/src/models/repository/entity/convert"
)

const (
	SystemsTableName  = "systems"
	WorkersTableName  = "workers"
	ControlsTableName = "controls"
	SchemesTableName  = "schemes"
)

func (sr systemRepository) SaveSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error {
	logger.Info("Init SaveSystem")

	systems, controls, schemes := converter.ConvertDomainToEntity(systemDomain)

	tx := sr.conn.Begin()

	if err := tx.Table(SchemesTableName).Create(&schemes).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Table(ControlsTableName).Create(&controls).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}

	systems.SchemeID = schemes.ID
	systems.ControlID = controls.ID

	tx = sr.conn.Begin()

	if err := tx.Table(SystemsTableName).Create(&systems).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}

	return nil
}
