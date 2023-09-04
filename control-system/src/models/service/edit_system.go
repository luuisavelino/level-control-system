package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) EditSystem(ctx context.Context, uuid uuid.UUID, systemDomain models.SystemDomainInterface) error {
	logger.Info("Init EditSystem service",
		zap.String("journey", "EditSystem"),
	)

	ss.manager.Edit(uuid, systemDomain)

	logger.Info("System edited by manager with success",
		zap.String("journey", "EditSystem"),
	)

	return nil
}
