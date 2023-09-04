package orquestrator

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
)

type worker interface {
	start()
	stop()
	GetUUID() uuid.UUID
	GetPath() string
}

type basicWorker struct {
	uuid        uuid.UUID
	data        models.SystemDomainInterface
	stopChan    chan struct{}
	mqttActions mqtt_actions.MqttActions
}

func (bw *basicWorker) GetUUID() uuid.UUID {
	return bw.uuid
}

func (bw *basicWorker) GetPath() string {
	return bw.data.GetPath()
}

func (bw *basicWorker) start() {
	fmt.Println("Starting basicWorker...")

	messageChannel := make(chan string)
	bw.mqttActions.Subscribe(bw.data.GetPath(), 1, messageChannel)

	go func() {
		for {
			select {
			case <-bw.stopChan:
				fmt.Printf("Worker %s has been stopped.\n", bw.uuid.String())
				return
			case message := <- messageChannel:
				fmt.Printf("Worker %s has received a message.\n", bw.uuid.String())
				bw.mqttActions.Publish("/tem/v2", 1, false, message)
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
