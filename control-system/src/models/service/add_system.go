package service

import (
	"context"
	"fmt"

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

	aa, err := ss.systemRepository.GetSystem(ctx, uuid)
	if err != nil {
		fmt.Println(err)
		return err
	}

	fmt.Println(aa)

	logger.Info("System created by manager with success",
		zap.String("journey", "AddSystem"),
	)

	return nil
}
