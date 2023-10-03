package mqtt_messaging

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

type MqttConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	ClientID string
}

type MqttMessaging struct {
	client MQTT.Client
}

func (mc MqttConfig) NewMqttMessaging() (MqttMessaging, error) {
	broker := fmt.Sprintf("tcp://%s:%s", mc.Host, mc.Port)

	opts := MQTT.
		NewClientOptions().
		AddBroker(broker).
		SetClientID(mc.ClientID)

	client := MQTT.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return MqttMessaging{}, token.Error()
	}

	return MqttMessaging{
		client: client,
	}, nil
}

func (mq MqttMessaging) Subscribe(topic string, qos byte, messageChannel chan string) error {
	if token := mq.client.Subscribe(topic, qos, messageHandler(messageChannel)); token.Wait() && token.Error() != nil {
		return token.Error()
	}
	return nil
}

func (mq MqttMessaging) Publish(topic string, qos byte, retained bool, payload interface{}) error {
	token := mq.client.Publish(topic, qos, retained, payload)
	token.Wait()
	return token.Error()
}

func (mq MqttMessaging) Unsubscribe(topic string) error {
	token := mq.client.Unsubscribe(topic)
	token.Wait()
	return token.Error()
}

func (mq MqttMessaging) Disconnect(quiesce uint) {
	mq.client.Disconnect(quiesce)
}

func messageHandler(messageChannel chan string) MQTT.MessageHandler {
	return func(client MQTT.Client, msg MQTT.Message) {
		messageChannel <- string(msg.Payload())
	}
}
