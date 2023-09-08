package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/repository"
)

func NewSystemServiceInterface(systemRepository repository.SystemRepository, manager orquestrator.Manager) SystemServiceInterface {
	return &systemServiceInterface{
		systemRepository: systemRepository,
		manager:          manager,
	}
}

type systemServiceInterface struct {
	systemRepository repository.SystemRepository
	manager          orquestrator.Manager
}

type SystemServiceInterface interface {
	AddSystem(ctx context.Context, systemDomain models.SystemDomainInterface) (map[string]string, error)
	DeleteSystem(ctx context.Context, uuid uuid.UUID) error
	EditSystem(ctx context.Context, uuid uuid.UUID, systemDomain models.SystemDomainInterface) error
}
