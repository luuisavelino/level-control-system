package messaging

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type MessagingConfig struct {
	clientID string
	host     string
	port     string
}

type Database interface {
	NewConnection() (MQTT.Client, error)
}

func NewMessaging(databse string, config MessagingConfig) Database {
	switch databse {
	case "mqtt":
		return mqttMessaging{config}
	default:
		return nil
	}
}

type mqttMessaging struct {
	config MessagingConfig
}

func (my mqttMessaging) NewConnection() (MQTT.Client, error) {
	broker := fmt.Sprintf("tcp://%s:%s", my.config.host, my.config.port)

	opts := MQTT.
		NewClientOptions().
		AddBroker(broker).
		SetClientID(my.config.clientID)

	client := MQTT.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return nil, token.Error()
	}

	return client, nil
}
