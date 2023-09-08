package repository

// import (
// 	"context"
// 	"database/sql"
// 	"fmt"

// 	"github.com/google/uuid"
// 	"github.com/luuisavelino/level-control-system/pkg/logger"
// 	"github.com/luuisavelino/level-control-system/src/models"
// 	"github.com/luuisavelino/level-control-system/src/models/repository/entity"
// 	converter "github.com/luuisavelino/level-control-system/src/models/repository/entity/convert"
// )

// const (
// 	SystemsTableName  = "systems"
// 	WorkersTableName  = "workers"
// 	ControlsTableName = "controls"
// 	SchemesTableName  = "schemes"
// )

// // Insert data into the Schemes table
// func InsertDataIntoSchemesTable(tx *sql.Tx, schemes entity.SchemesEntity) (int64, error) {
// 	schemesStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (scheme_setpoint, scheme_min_level, scheme_max_level) VALUES (?, ?, ?)", SchemesTableName))
// 	if err != nil {
// 		return 0, err
// 	}
// 	defer schemesStmt.Close()

// 	result, err := schemesStmt.Exec(schemes.Setpoint, schemes.MinLevel, schemes.MaxLevel)
// 	if err != nil {
// 		return 0, err
// 	}

// 	schemeID, err := result.LastInsertId()
// 	if err != nil {
// 		return 0, err
// 	}

// 	return schemeID, nil
// }

// // Insert data into the Controls table
// func InsertDataIntoControlsTable(tx *sql.Tx, controls entity.ControlsEntity) (int64, error) {
// 	controlsStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (control_type, control_kp, control_ki, control_kd) VALUES (?, ?, ?, ?)", ControlsTableName))
// 	if err != nil {
// 		return 0, err
// 	}
// 	defer controlsStmt.Close()

// 	result, err := controlsStmt.Exec(controls.Type, controls.Kp, controls.Ki, controls.Kd)
// 	if err != nil {
// 		return 0, err
// 	}

// 	controlID, err := result.LastInsertId()
// 	if err != nil {
// 		return 0, err
// 	}

// 	return controlID, nil
// }

// // Insert data into the SystemsEntity table
// func InsertDataIntoSystemsTable(tx *sql.Tx, systems entity.SystemsEntity, schemeID int64, controlID int64) (int64, error) {
// 	systemsStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (system_name, system_path, system_description, scheme_id, control_id) VALUES (?, ?, ?, ?, ?)", SystemsTableName))
// 	if err != nil {
// 		return 0, err
// 	}
// 	defer systemsStmt.Close()

// 	result, err := systemsStmt.Exec(systems.Name, systems.Path, systems.Description, schemeID, controlID)
// 	if err != nil {
// 		return 0, err
// 	}

// 	systemsID, err := result.LastInsertId()
// 	if err != nil {
// 		return 0, err
// 	}

// 	return systemsID, nil
// }

// func InsertDataIntoWorkersTable(tx *sql.Tx, workerUUID uuid.UUID, systemID int64) error {
// 	workersStmt, err := tx.Prepare(fmt.Sprintf("INSERT INTO %s (worker_uuid, system_id) VALUES (?, ?)", WorkersTableName))
// 	if err != nil {
// 		tx.Rollback()
// 		return err
// 	}
// 	defer workersStmt.Close()

// 	_, err = workersStmt.Exec(workerUUID, systemID)
// 	if err != nil {
// 		tx.Rollback()
// 		return err
// 	}

// 	return nil
// }

// // SaveWorker is a function that will save a worker in the database.
// func (sr systemRepository) SaveWorker(ctx context.Context, workerUUID uuid.UUID, systemID int64) error {
// 	logger.Info("Init SaveWorker")

// 	tx, err := sr.db.Begin()
// 	if err != nil {
// 		return err
// 	}

// 	err = InsertDataIntoWorkersTable(tx, workerUUID, systemID)
// 	if err != nil {
// 		tx.Rollback()
// 		return err
// 	}

// 	if err = tx.Commit(); err != nil {
// 		return err
// 	}

// 	return nil
// }

// // SaveSystem is a function that will save a system in the database.
// func (sr systemRepository) SaveSystem(ctx context.Context, systemDomain models.SystemDomainInterface) (int64, error) {
// 	logger.Info("Init SaveSystem")

// 	systems, controls, schemes := converter.ConvertDomainToEntity(systemDomain)

// 	tx, err := sr.db.Begin()
// 	if err != nil {
// 		return 0, err
// 	}

// 	schemeID, err := InsertDataIntoSchemesTable(tx, schemes)
// 	if err != nil {
// 		tx.Rollback()
// 		return 0, err
// 	}

// 	controlID, err := InsertDataIntoControlsTable(tx, controls)
// 	if err != nil {
// 		tx.Rollback()
// 		return 0, err
// 	}

// 	systemID, err := InsertDataIntoSystemsTable(tx, systems, schemeID, controlID)
// 	if err != nil {
// 		tx.Rollback()
// 		return 0, err
// 	}

// 	if err = tx.Commit(); err != nil {
// 		return 0, err
// 	}

// 	return systemID, nil
// }
