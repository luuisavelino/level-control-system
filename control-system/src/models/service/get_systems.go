package service

import (
	"context"
	"fmt"
	"time"

	"github.com/luuisavelino/level-control-system/src/models"
)

func (ss *systemServiceInterface) GetSystems(ctx context.Context, systemDomain models.SystemDomainInterface) (string, error) {
	fmt.Println("GetSystems")

	system := ss.manager.NewBasicWorker(ss.mqttActions, systemDomain)
	ss.manager.Add(system)

	time.Sleep(time.Second * 5)
	fmt.Println(ss.manager.GetWorkers())

	ss.manager.Remove(system)

	return "sucesso", nil
}
