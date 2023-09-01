package service

import (
	"fmt"
	"time"
)

func (ss *systemServiceInterface) GetSystems() (string, error) {
	fmt.Println("GetSystems")

	manager := NewWorkerManager()

	worker1 := NewBasicWorker()
	worker2 := NewBasicWorker()

	manager.Add(worker1)
	manager.Add(worker2)

	go worker1.Start()
	go worker2.Start()

	go manager.StartMonitoringAndRestart()

	time.Sleep(10 * time.Second)

	worker1.Stop()

	time.Sleep(5 * time.Second)

	return "sucesso", nil
}
