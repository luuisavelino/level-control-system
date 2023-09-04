package orquestrator

import (
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
	"go.uber.org/zap"
)

type Manager interface {
	NewBasicWorker(systemData models.SystemDomainInterface) (worker worker)
	GetWorkers() (workers map[uuid.UUID]worker)
	GetWorkersUUID() (workersUUID []uuid.UUID)
	Add(worker worker)
	Remove(uuid uuid.UUID)
	Edit(uuid uuid.UUID, systemData models.SystemDomainInterface)
	StartMonitoringAndRestart(delay time.Duration)
}

type basicManager struct {
	workers map[uuid.UUID]worker
	mutex   sync.Mutex
	mqttActions mqtt_actions.MqttActions
}

// NewBasicManager is a function that will create a new manager.
func NewBasicManager(mqttActions mqtt_actions.MqttActions) Manager {
	return &basicManager{
		workers: make(map[uuid.UUID]worker),
		mqttActions: mqttActions,
	}
}

// NewBasicWorker is a function that will create a new worker.
func (wm *basicManager) NewBasicWorker(systemData models.SystemDomainInterface) worker {
	return &basicWorker{
		uuid:        uuid.New(),
		stopChan:    make(chan struct{}),
		data:        systemData,
		mqttActions: wm.mqttActions,
	}
}

// GetWorkers is a function that will return all workers.
func (wm *basicManager) GetWorkers() (workers map[uuid.UUID]worker) {
	logger.Info("Get workers",
		zap.String("journey", "Manager"),
	)

	return wm.workers
}

// GetWorkersUUID is a function that will return all workers uuid.
func (wm *basicManager) GetWorkersUUID() (workersUUID []uuid.UUID) {
	logger.Info("Get workers uuid",
		zap.String("journey", "Manager"),
	)

	for _, worker := range wm.workers {
		workersUUID = append(workersUUID, worker.getUUID())
	}
	return workersUUID
}

// Add is a function that will add a worker to the manager.
func (wm *basicManager) Add(worker worker) {
	logger.Info("Add worker to manager",
		zap.String("journey", "Manager"),
	)

	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	wm.workers[worker.getUUID()] = worker
	worker.start()
}

// Remove is a function that will remove a worker from the manager.
func (wm *basicManager) Remove(uuid uuid.UUID) {
	logger.Info("Remove worker from manager",
		zap.String("journey", "Manager"),
	)

	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	worker.stop(wm.workers[uuid])
	delete(wm.workers, uuid)
}

// Edit is a function that will edit a worker from the manager.
func (wm *basicManager) Edit(uuid uuid.UUID, systemData models.SystemDomainInterface) {
	logger.Info("Edit worker from manager",
		zap.String("journey", "Manager"),
	)

	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	wm.workers[uuid].stop()
	wm.workers[uuid].(*basicWorker).data = systemData
	wm.workers[uuid].start()
}

// StartMonitoringAndRestart is a function that will check if the workers are running and restart them if they are not.
func (wm *basicManager) StartMonitoringAndRestart(delay time.Duration) {
	logger.Info("Start monitoring and restart workers",
		zap.String("journey", "Manager"),
	)

	if delay == 0 {
		delay = 10 * time.Second
	}

	go func() {
		for {
			logger.Info("Checking workers",
				zap.String("journey", "Manager"),
			)

			wm.mutex.Lock()

			for _, worker := range wm.workers {
				select {
				case <-worker.(*basicWorker).stopChan:
					logger.Info(fmt.Sprintf("worker %s is not running. Restarting", worker.getUUID().String()),
						zap.String("journey", "Manager"),
					)
					worker.start()
				default:
				}
			}

			wm.mutex.Unlock()

			time.Sleep(delay)
		}
	}()
}
