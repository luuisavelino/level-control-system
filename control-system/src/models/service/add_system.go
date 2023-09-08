package service

import (
	"context"

	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) (map[string]string, error) {
	logger.Info("Init AddSystem service",
		zap.String("journey", "AddSystem"),
	)

	err := ss.systemRepository.SaveSystem(ctx, systemDomain)
	if err != nil {
		logger.Error("Init AddSystem service",
			err,
			zap.String("journey", "AddSystem"),
		)
		return nil, err
	}

	system := ss.manager.NewAdvancedWorker(systemDomain)
	ss.manager.Add(system)

	logger.Info("System added by manager with success",
		zap.String("journey", "AddSystem"),
	)

	return nil, nil
}
