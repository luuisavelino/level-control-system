package orquestrator

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/messaging_action"
	"go.uber.org/zap"
)

type Manager interface {
	NewAdvancedWorker(systemData models.SystemDomainInterface) (worker worker)
	GetWorkers() (workers map[uuid.UUID]worker)
	Add(worker worker)
	Remove(uuid uuid.UUID)
	Edit(uuid uuid.UUID, systemData models.SystemDomainInterface)
	StartMonitoring(delay time.Duration)
}

type basicManager struct {
	workers   map[uuid.UUID]worker
	mutex     sync.Mutex
	messaging messaging_action.Messaging
}

// NewBasicManager is a function that will create a new manager.
func NewBasicManager(messaging messaging_action.Messaging) Manager {
	return &basicManager{
		workers:   make(map[uuid.UUID]worker),
		messaging: messaging,
	}
}

// NewadvancedWorker is a function that will create a new worker.
func (wm *basicManager) NewAdvancedWorker(systemData models.SystemDomainInterface) worker {
	ctx, cancel := context.WithCancel(context.Background())

	return &advancedWorker{
		uuid: uuid.New(),
		data: systemData,
		action: action{
			ctx:    ctx,
			cancel: cancel,
			messaging:   wm.messaging,
		},
	}
}

// GetWorkers is a function that will return all workers.
func (wm *basicManager) GetWorkers() (workers map[uuid.UUID]worker) {
	logger.Info("Get workers",
		zap.String("journey", "Manager"),
	)

	return wm.workers
}

// Add is a function that will add a worker to the manager.
func (wm *basicManager) Add(worker worker) {
	logger.Info("Add worker to manager",
		zap.String("journey", "Manager"),
	)

	wm.mutex.Lock()
	defer wm.mutex.Unlock()
	wm.workers[worker.GetUUID()] = worker
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
	wm.workers[uuid].(*advancedWorker).data = systemData
	wm.workers[uuid].start()
}

// StartMonitoring is a function that will check if the workers are running and restart them if they are not.
func (wm *basicManager) StartMonitoring(delay time.Duration) {
	logger.Info("Start monitoring and restart workers",
		zap.String("journey", "Manager"),
	)

	if delay < 10 {
		delay = 10 * time.Second
	}

	go func() {
		for {
			logger.Info("Checking workers",
				zap.String("journey", "Manager"),
			)

			wm.mutex.Lock()
			for _, worker := range wm.workers {

				fmt.Println(worker.GetUUID())

				select {
				case <-worker.(*advancedWorker).action.ctx.Done():
					logger.Error(fmt.Sprintf("worker %s is not running.", worker.GetUUID().String()),
						worker.GetCtx().Err(),
						zap.String("journey", "Manager"),
					)

					delete(wm.workers, worker.GetUUID())
				default:
				}
			}

			wm.mutex.Unlock()

			time.Sleep(delay)
		}
	}()
}
