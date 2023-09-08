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

	// ss.manager.Edit()

	logger.Info("System updated by manager with success",
		zap.String("journey", "UpdateSystem"),
	)

	return nil
}
