package repository

import (
	"context"
	"database/sql"
	"fmt"

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

// Insert data into the Schemes table
func InsertDataIntoSchemesTable(tx *sql.Tx, schemes entity.SchemesEntity) (int64, error) {
	schemesStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (scheme_setpoint, scheme_min_level, scheme_max_level) VALUES (?, ?, ?)", SchemesTableName))
	if err != nil {
		return 0, err
	}
	defer schemesStmt.Close()

	result, err := schemesStmt.Exec(schemes.Setpoint, schemes.MinLevel, schemes.MaxLevel)
	if err != nil {
		return 0, err
	}

	schemesID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return schemesID, nil
}

// Insert data into the Controls table
func InsertDataIntoControlsTable(tx *sql.Tx, controls entity.ControlsEntity) (int64, error) {
	controlsStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (control_type, control_kp, control_ki, control_kd) VALUES (?, ?, ?, ?)", ControlsTableName))
	if err != nil {
		return 0, err
	}
	defer controlsStmt.Close()

	result, err := controlsStmt.Exec(controls.Type, controls.Kp, controls.Ki, controls.Kd)
	if err != nil {
		return 0, err
	}

	controlsID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return controlsID, nil
}

// Insert data into the SystemsEntity table
func InsertDataIntoSystemsTable(tx *sql.Tx, systems entity.SystemsEntity, schemesID int64, controlsID int64) (int64, error) {
	systemsStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (system_name, system_path, system_description, scheme_id, control_id) VALUES (?, ?, ?, ?, ?)", SystemsTableName))
	if err != nil {
		tx.Rollback()
		return 0, err
	}
	defer systemsStmt.Close()

	result, err := systemsStmt.Exec(systems.Name, systems.Path, systems.Description, schemesID, controlsID)
	if err != nil {
		tx.Rollback()
		return 0, err
	}

	systemsID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return systemsID, nil
}

func (sr systemRepository) SaveSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error {
	logger.Info("Init SaveSystem")

	systems, controls, schemes := converter.ConvertDomainToEntity(systemDomain)

	tx, err := sr.db.Begin()
	if err != nil {
		return err
	}

	schemesID, err := InsertDataIntoSchemesTable(tx, schemes)
	if err != nil {
		tx.Rollback()
		return err
	}

	controlsID, err := InsertDataIntoControlsTable(tx, controls)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = InsertDataIntoSystemsTable(tx, systems, schemesID, controlsID)
	if err != nil {
		tx.Rollback()
		return err
	}

	if err = tx.Commit(); err != nil {
		return err
	}

	return nil
}
