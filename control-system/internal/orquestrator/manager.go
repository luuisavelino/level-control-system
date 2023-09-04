package orquestrator

import (
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
)

type Manager interface {
	NewBasicWorker(mqttActions mqtt_actions.MqttActions, systemData models.SystemDomainInterface) (worker worker)
	GetWorkers() (workers map[uuid.UUID]worker)
	GetWorkersUUID() (workersUUID []uuid.UUID)
	Add(worker worker)
	Remove(uuid uuid.UUID)
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

func (wm *basicManager) NewBasicWorker(mqttActions mqtt_actions.MqttActions, systemData models.SystemDomainInterface) worker {
	return &basicWorker{
		uuid:        uuid.New(),
		stopChan:    make(chan struct{}),
		data:        systemData,
		mqttActions: mqttActions,
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

func (wm *basicManager) Remove(uuid uuid.UUID) {
	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	worker.stop(wm.workers[uuid])
	delete(wm.workers, uuid)
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
