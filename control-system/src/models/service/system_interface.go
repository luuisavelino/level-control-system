package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/src/models"
	mqtt_actions "github.com/luuisavelino/level-control-system/src/mqtt"
)

func NewSystemServiceInterface(conn *gorm.DB, mqttActions mqtt_actions.MqttActions, manager orquestrator.Manager) SystemServiceInterface {
	return &systemServiceInterface{
		conn:        conn,
		mqttActions: mqttActions,
		manager:     manager,
	}
}

type systemServiceInterface struct {
	conn        *gorm.DB
	mqttActions mqtt_actions.MqttActions
	manager     orquestrator.Manager
}

type SystemServiceInterface interface {
	GetSystems(ctx context.Context) (string, error)
	AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error
	GetSystemByUUID(ctx context.Context, uuid uuid.UUID) (string, error)
	DeleteSystem(ctx context.Context, uuid uuid.UUID) error
}
