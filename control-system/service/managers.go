package service

import (
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
)

type WorkerManager struct {
	workers map[uuid.UUID]Worker
	mutex   sync.Mutex
}

func NewWorkerManager() *WorkerManager {
	fmt.Println("Creating WorkerManager...")
	return &WorkerManager{
		workers: make(map[uuid.UUID]Worker),
	}
}

func (wm *WorkerManager) GetWorkers() map[uuid.UUID]Worker {
	fmt.Println("Getting Workers...")
	return wm.workers
}

func (wm *WorkerManager) Add(worker Worker) {
	fmt.Println("Adding worker...")
	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	wm.workers[worker.UUID()] = worker
}

func (wm *WorkerManager) Remove(worker Worker) {
	fmt.Println("Removing worker...")
	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	delete(wm.workers, worker.UUID())
}

func (wm *WorkerManager) StartMonitoringAndRestart() {
	for {
		fmt.Println("Checking workers...")
		wm.mutex.Lock()
		for _, worker := range wm.workers {
			select {
			case <-worker.(*BasicWorker).stopChan:
				fmt.Println("Worker is not running. Restarting...")
				go worker.Start()
			default:
				fmt.Println("Worker is running.")
			}
		}
		wm.mutex.Unlock()

		time.Sleep(time.Second)
	}
}
