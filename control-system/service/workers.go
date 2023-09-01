package service

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Worker interface {
	Start()
	Stop()
	UUID() uuid.UUID
}

type BasicWorker struct {
	uuid     uuid.UUID
	stopChan chan struct{}
}

func NewBasicWorker() Worker {
	fmt.Println("Creating BasicWorker...")
	return &BasicWorker{
		uuid:     uuid.New(),
		stopChan: make(chan struct{}),
	}
}

func (bw *BasicWorker) UUID() uuid.UUID {
	fmt.Println("Getting UUID...")
	return bw.uuid
}

func (bw *BasicWorker) Start() {
	fmt.Println("Starting BasicWorker...")
	go func() {
		for {
			select {
			case <-bw.stopChan:
				fmt.Printf("Worker %s has been stopped.\n", bw.uuid.String())
				return
			default:
				fmt.Printf("Worker %s is running.\n", bw.uuid.String())
				time.Sleep(time.Second)
			}
		}
	}()
}

func (bw *BasicWorker) Stop() {
	fmt.Println("Stopping BasicWorker...")
	close(bw.stopChan)
}
