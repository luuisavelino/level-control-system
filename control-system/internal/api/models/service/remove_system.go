package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/config/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) RemoveSystem(ctx context.Context, uuid uuid.UUID) error {
	logger.Info("Init RemoveSystem service",
		zap.String("journey", "RemoveSystem"),
	)

	err := ss.manager.Remove(uuid)
	if err != nil {
		return err
	}

	logger.Info("System removed with success",
		zap.String("journey", "RemoveSystem"),
	)

	return nil
}
