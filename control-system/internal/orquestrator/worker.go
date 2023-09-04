package orquestrator

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
	"go.uber.org/zap"
)

type worker interface {
	start()
	stop() error
	getUUID() uuid.UUID
}

type basicWorker struct {
	uuid        uuid.UUID
	data        models.SystemDomainInterface
	stopChan    chan struct{}
	mqttActions mqtt_actions.MqttActions
}

// NewBasicWorker is a function that will create a new worker.
func (bw *basicWorker) getUUID() uuid.UUID {
	return bw.uuid
}

// NewBasicWorker is a function that will create a new worker.
func (bw *basicWorker) start() {
	logger.Info("Worker started",
		zap.String("journey", "Worker"),
	)

	messageChannel := make(chan string)
	bw.mqttActions.Subscribe(bw.data.GetPath(), 1, messageChannel)

	go func() {
		for {
			select {
			case <-bw.stopChan:
				logger.Info(fmt.Sprintf("Worker %s has been stopped", bw.uuid.String()),
					zap.String("journey", "Worker"),
				)
				return
			case message := <-messageChannel:
				bw.mqttActions.Publish("/tem/v2", 1, false, message)
			default:
				time.Sleep(time.Second)
			}
		}
	}()
}

// NewBasicWorker is a function that will create a new worker.
func (bw *basicWorker) stop() error {
	logger.Info("Worker stoped",
		zap.String("journey", "Worker"),
	)

	err := bw.mqttActions.Unsubscribe(bw.data.GetPath())
	if err != nil {
		logger.Error("Error on unsubscribe topic",
			err,
			zap.String("journey", "Worker"),
		)

		return err
	}

	close(bw.stopChan)
	return nil
}
