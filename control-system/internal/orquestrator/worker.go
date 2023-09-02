package orquestrator

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type worker interface {
	start()
	stop()
	GetUUID() uuid.UUID
	GetPath() string
}

type basicWorker struct {
	uuid     uuid.UUID
	path     string
	stopChan chan struct{}
}

func (bw *basicWorker) GetUUID() uuid.UUID {
	return bw.uuid
}

func (bw *basicWorker) GetPath() string {
	return bw.path
}

func (bw *basicWorker) start() {
	fmt.Println("Starting basicWorker...")
	go func() {
		for {
			select {
			case <-bw.stopChan:
				fmt.Printf("Worker %s has been stopped.\n", bw.uuid.String())
				return
			default:
				time.Sleep(time.Second)
			}
		}
	}()
}

func (bw *basicWorker) stop() {
	fmt.Println("Stopping basicWorker...")
	close(bw.stopChan)
}
