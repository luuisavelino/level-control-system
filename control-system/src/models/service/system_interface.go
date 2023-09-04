package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/src/models"
)

func NewSystemServiceInterface(conn *gorm.DB, manager orquestrator.Manager) SystemServiceInterface {
	return &systemServiceInterface{
		conn:    conn,
		manager: manager,
	}
}

type systemServiceInterface struct {
	conn    *gorm.DB
	manager orquestrator.Manager
}

type SystemServiceInterface interface {
	GetSystems(ctx context.Context) (map[string]string, error)
	AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) (map[string]string, error)
	GetSystemByUUID(ctx context.Context, uuid uuid.UUID) (map[string]string, error)
	DeleteSystem(ctx context.Context, uuid uuid.UUID) error
	EditSystem(ctx context.Context, uuid uuid.UUID, systemDomain models.SystemDomainInterface) error
}
