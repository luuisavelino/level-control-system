package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
)

// GetSystem get system by uuid
func (sr systemRepository) GetSystem(ctx context.Context, uuid uuid.UUID) (models.SystemDomainInterface, error) {
	logger.Info("Init SaveWorker")

	tx, err := sr.db.Begin()
	if err != nil {
		return nil, err
	}

	// TODO: Implement

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	return nil, nil
}
