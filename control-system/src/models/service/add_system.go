package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) AddSystem(ctx context.Context, uuid uuid.UUID) error {
	logger.Info("Init AddSystem service",
		zap.String("journey", "AddSystem"),
	)

	// system := ss.manager.NewAdvancedWorker(uuid)
	// ss.manager.Add(system)

	logger.Info("System created by manager with success",
		zap.String("journey", "AddSystem"),
	)

	return nil
}
