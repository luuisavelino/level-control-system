package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) DeleteSystem(ctx context.Context, uuid uuid.UUID) error {
	logger.Info("Init DeleteSystem service",
		zap.String("journey", "DeleteSystem"),
	)

	ss.manager.Remove(uuid)

	return nil
}
