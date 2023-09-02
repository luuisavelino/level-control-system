package service

import (
	"context"
	"fmt"
	"time"

	"github.com/luuisavelino/level-control-system/src/models"
)

func (ss *systemServiceInterface) GetSystems(ctx context.Context, systemDomain models.SystemDomainInterface) (string, error) {
	fmt.Println("GetSystems")

	worker := ss.manager.NewBasicWorker("/tem/v1")

	ss.manager.Add(worker)

	time.Sleep(time.Second * 5)
	fmt.Println(ss.manager.GetWorkers())


	ss.manager.Remove(worker)

	return "sucesso", nil
}
