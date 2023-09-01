package service

import (
	"fmt"
)

func (ss *systemServiceInterface) AddSystem() error {
	fmt.Println("AddSystem")

	manager := NewWorkerManager()

	worker1 := NewBasicWorker()
	worker2 := NewBasicWorker()

	manager.Add(worker1)
	manager.Add(worker2)

	go worker1.Start()
	go worker2.Start()

	return nil
}
