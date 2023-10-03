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

	system, err := ss.systemRepository.GetSystem(ctx, uuid)
	if err != nil {
		return err
	}

	worker := ss.manager.NewAdvancedWorker(uuid, system)
	ss.manager.Add(worker)

	logger.Info("System created by manager with success",
		zap.String("journey", "AddSystem"),
	)

	return nil
}
