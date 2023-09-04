package mqtt_actions

import (
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type MqttActions interface {
	Subscribe(topic string, qos byte, messageChannel chan string) error
	Publish(topic string, qos byte, retained bool, payload interface{}) error
	Unsubscribe(topic string) error
	Disconnect(quiesce uint)
}

type mqttActions struct {
	client MQTT.Client
}

func NewMqttActions(client MQTT.Client) mqttActions {
	return mqttActions{client}
}

func (mq mqttActions) Subscribe(topic string, qos byte, messageChannel chan string) error {
	if token := mq.client.Subscribe(topic, qos, messageHandler(messageChannel)); token.Wait() && token.Error() != nil {
		return token.Error()
	}
	return nil
}

func (mq mqttActions) Publish(topic string, qos byte, retained bool, payload interface{}) error {
	token := mq.client.Publish(topic, qos, retained, payload)
	token.Wait()
	return token.Error()
}

func (mq mqttActions) Unsubscribe(topic string) error {
	token := mq.client.Unsubscribe(topic)
	token.Wait()
	return token.Error()
}

func (mq mqttActions) Disconnect(quiesce uint) {
	mq.client.Disconnect(quiesce)
}

func messageHandler(messageChannel chan string) MQTT.MessageHandler {
	return func(client MQTT.Client, msg MQTT.Message) {
		messageChannel <- string(msg.Payload())
	}
}
