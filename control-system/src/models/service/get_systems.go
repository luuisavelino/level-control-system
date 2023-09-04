package service

import (
	"context"
	"fmt"

	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (ss *systemServiceInterface) GetSystems(ctx context.Context) (map[string]string, error) {
	logger.Info("Init GetSystems service",
		zap.String("journey", "GetSystems"),
	)

	workers := ss.manager.GetWorkersUUID()

	fmt.Println(workers)

	return nil, nil
}
