package service

import (
	"context"
	"fmt"

	"github.com/luuisavelino/level-control-system/src/models"
)

func (ss *systemServiceInterface) AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error {
	fmt.Println("AddSystem")

	path := "/tem/v1"

	worker := ss.manager.NewBasicWorker(path)
	ss.manager.Add(worker)

	messageChannel := make(chan string)
	ss.mqttActions.Subscribe(path, 1, messageChannel)

	go func() {
		for message := range messageChannel {
			ss.mqttActions.Publish("/tem/v2", 1, false, message)
		}
	}()

	return nil
}
