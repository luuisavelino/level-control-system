package repository

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/src/models"
)

type systemRepository struct {
	db *sql.DB
}

func NewSystemRepository(db *sql.DB) systemRepository {
	return systemRepository{
		db: db,
	}
}

type SystemRepository interface {
	SaveSystem(ctx context.Context, systemDomain models.SystemDomainInterface) (int64, error)
	SaveWorker(ctx context.Context, workerUUID uuid.UUID, systemID int64) error
}
