package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) RemoveSystem(ctx context.Context, uuid uuid.UUID) error {
	logger.Info("Init RemoveSystem service",
		zap.String("journey", "RemoveSystem"),
	)

	ss.manager.Remove(uuid)

	logger.Info("System deleted by manager with success",
		zap.String("journey", "RemoveSystem"),
	)

	return nil
}
