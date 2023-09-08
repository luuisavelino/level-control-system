package orquestrator

import (
	"fmt"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/algorithm"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/messaging_action"
	"go.uber.org/zap"
)

type worker interface {
	start()
	stop() error
	GetUUID() uuid.UUID
}

type basicWorker struct {
	uuid      uuid.UUID
	data      models.SystemDomainInterface
	stopChan  chan struct{}
	messaging messaging_action.Messaging
}

func (bw *basicWorker) GetUUID() uuid.UUID {
	return bw.uuid
}

func (bw *basicWorker) start() {
	logger.Info("Worker started",
		zap.String("journey", "Worker"),
	)

	control := algorithm.NewAlgorithm(bw.data.GetControlType(), bw.data.GetSetpoint(), bw.data.GetGains())

	messageChannel := make(chan string)
	bw.messaging.Subscribe(bw.data.GetPath(), 1, messageChannel)

	go func() {
		for {
			select {
			case <-bw.stopChan:
				logger.Info(fmt.Sprintf("Worker %s has been stopped", bw.uuid.String()),
					zap.String("journey", "Worker"),
				)
				return

			case message := <-messageChannel:
				currentLevel, err := strconv.ParseFloat(message, 64)
				if err != nil {
					return
				}
				actionControl := control.Compute(currentLevel)
				bw.messaging.Publish(fmt.Sprintf("%s/action", bw.data.GetPath()), 1, false, actionControl)

			default:
				time.Sleep(time.Millisecond * 10)
			}
		}
	}()
}

func (bw *basicWorker) stop() error {
	logger.Info("Worker stoped",
		zap.String("journey", "Worker"),
	)

	err := bw.messaging.Unsubscribe(bw.data.GetPath())
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
