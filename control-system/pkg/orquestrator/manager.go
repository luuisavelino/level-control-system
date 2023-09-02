package orquestrator

import (
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
)

type Manager interface {
	NewBasicWorker(path string) (worker worker)
	GetWorkers() (workers map[uuid.UUID]worker)
	GetWorkersUUID() (workersUUID []uuid.UUID)
	Add(worker worker)
	Remove(worker worker)
	StartMonitoringAndRestart()
}

type basicManager struct {
	workers map[uuid.UUID]worker
	mutex   sync.Mutex
}

func NewBasicManager() Manager {
	return &basicManager{
		workers: make(map[uuid.UUID]worker),
	}
}

func (wm *basicManager) NewBasicWorker(path string) worker {
	return &basicWorker{
		uuid:     uuid.New(),
		path:     path,
		stopChan: make(chan struct{}),
	}
}

func (wm *basicManager) GetWorkers() (workers map[uuid.UUID]worker) {
	return wm.workers
}

func (wm *basicManager) GetWorkersUUID() (workersUUID []uuid.UUID) {
	for _, worker := range wm.workers {
		workersUUID = append(workersUUID, worker.GetUUID())
	}
	return workersUUID
}

func (wm *basicManager) Add(worker worker) {
	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	wm.workers[worker.GetUUID()] = worker
	worker.start()
}

func (wm *basicManager) Remove(worker worker) {
	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	worker.stop()
	delete(wm.workers, worker.GetUUID())
}

func (wm *basicManager) StartMonitoringAndRestart() {
	go func() {
		for {
			fmt.Println("Checking workers...")
			wm.mutex.Lock()
			for _, worker := range wm.workers {
				select {
				case <-worker.(*basicWorker).stopChan:
					fmt.Println("worker" + worker.GetUUID().String() + "is not running. Restarting...")
					worker.start()
				default:
				}
			}
			wm.mutex.Unlock()

			time.Sleep(time.Second * 5)
		}
	}()
}
