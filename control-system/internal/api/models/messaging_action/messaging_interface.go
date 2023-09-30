package messaging_action

import MQTT "github.com/eclipse/paho.mqtt.golang"

type Messaging interface {
	Subscribe(topic string, qos byte, messageChannel chan string) error
	Publish(topic string, qos byte, retained bool, payload interface{}) error
	Unsubscribe(topic string) error
	Disconnect(quiesce uint)
}

func NewMqttActions(client MQTT.Client) Messaging {
	return mqttActions{client}
}
