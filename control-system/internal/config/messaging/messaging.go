package messaging

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type MessagingConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	ClientID string
}

type Messaging interface {
	NewConnection() (MQTT.Client, error)
}

func NewMessaging(databse string, config MessagingConfig) Messaging {
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

func (mq mqttMessaging) NewConnection() (MQTT.Client, error) {
	broker := fmt.Sprintf("tcp://%s:%s", mq.config.Host, mq.config.Port)

	opts := MQTT.
		NewClientOptions().
		AddBroker(broker).
		SetClientID(mq.config.ClientID)

	client := MQTT.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return nil, token.Error()
	}

	return client, nil
}
