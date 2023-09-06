package orquestrator

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/algorithm"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
	"go.uber.org/zap"
)

type advancedWorker struct {
	uuid        uuid.UUID
	data        models.SystemDomainInterface
	ctx         context.Context
	cancel      context.CancelFunc
	mqttActions mqtt_actions.MqttActions
}

func (aw *advancedWorker) GetUUID() uuid.UUID {
	return aw.uuid
}

func (aw *advancedWorker) start() {
	logger.Info("Worker started",
		zap.String("journey", "Worker"),
	)

	control := algorithm.NewAlgorithm(aw.data.GetControlType(), aw.data.GetSetpoint(), aw.data.GetGains())

	messageChannel := make(chan string)
	aw.mqttActions.Subscribe(aw.data.GetPath(), 1, messageChannel)

	go func() {
		for {
			select {
			case <-aw.ctx.Done():
				logger.Info(fmt.Sprintf("Worker %s has been stopped", aw.uuid.String()),
					zap.String("journey", "Worker"),
				)
				return

			case message := <-messageChannel:
				currentLevel, err := strconv.ParseFloat(message, 64)
				if err != nil {
					return
				}
				actionControl := control.Compute(currentLevel)
				aw.mqttActions.Publish(fmt.Sprintf("%s/action", aw.data.GetPath()), 1, false, actionControl)

			default:
				time.Sleep(time.Millisecond * 10)
			}
		}
	}()
}

func (aw *advancedWorker) stop() error {
	logger.Info("Worker stoped",
		zap.String("journey", "Worker"),
	)

	err := aw.mqttActions.Unsubscribe(aw.data.GetPath())
	if err != nil {
		logger.Error("Error on unsubscribe topic",
			err,
			zap.String("journey", "Worker"),
		)
		return err
	}

	aw.cancel()

	return nil
}