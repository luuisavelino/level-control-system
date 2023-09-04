package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) GetSystemByUUID(ctx context.Context, uuid uuid.UUID) (map[string]string, error) {
	logger.Info("Init GetSystemByUUID service",
		zap.String("journey", "GetSystemByUUID"),
	)

	return nil, nil
}
