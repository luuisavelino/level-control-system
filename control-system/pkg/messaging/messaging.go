package messaging

import (
	mqtt_messaging "github.com/luuisavelino/level-control-system/pkg/messaging/mqtt_messaging"
)

type MessagingConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	ClientID string
}

type Messaging interface {
	Subscribe(topic string, qos byte, messageChannel chan string) error
	Publish(topic string, qos byte, retained bool, payload interface{}) error
	Unsubscribe(topic string) error
	Disconnect(quiesce uint)
}

func NewMessaging(databse string, config MessagingConfig) (Messaging, error) {
	switch databse {
	case "mqtt":
		mqttConfig := config.ToMqttConfig()
		return mqttConfig.NewMqttMessaging()
	default:
		return nil, nil
	}
}

func (mc MessagingConfig) ToMqttConfig() mqtt_messaging.MqttConfig {
	return mqtt_messaging.MqttConfig{
		Host:     mc.Host,
		Port:     mc.Port,
		User:     mc.User,
		Password: mc.Password,
		ClientID: mc.ClientID,
	}
}
