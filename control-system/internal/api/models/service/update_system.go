package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) UpdateSystem(ctx context.Context, uuid uuid.UUID) error {
	logger.Info("Init UpdateSystem service",
		zap.String("journey", "UpdateSystem"),
	)

	err := ss.manager.Remove(uuid)
	if err != nil {
		return err
	}

	system, err := ss.systemRepository.GetSystem(ctx, uuid)
	if err != nil {
		return err
	}

	worker := ss.manager.NewAdvancedWorker(uuid, system)
	ss.manager.Add(worker)

	logger.Info("System updated by manager with success",
		zap.String("journey", "UpdateSystem"),
	)

	return nil
}
