package service

import (
	"context"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/jinzhu/gorm"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/src/models"
)

func NewSystemServiceInterface(conn *gorm.DB, mqtt mqtt.Client, manager orquestrator.Manager) SystemServiceInterface {
	return &systemServiceInterface{
		conn:    conn,
		mqtt:    mqtt,
		manager: manager,
	}
}

type systemServiceInterface struct {
	conn    *gorm.DB
	mqtt    mqtt.Client
	manager orquestrator.Manager
}

type SystemServiceInterface interface {
	AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error
	GetSystems(ctx context.Context, systemDomain models.SystemDomainInterface) (string, error)
	DeleteSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error
}
