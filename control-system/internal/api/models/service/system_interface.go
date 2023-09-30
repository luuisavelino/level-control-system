package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/orquestrator"
	"github.com/luuisavelino/level-control-system/internal/api/models/repository"
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
	AddSystem(ctx context.Context, uuid uuid.UUID) error
	RemoveSystem(ctx context.Context, uuid uuid.UUID) error
	UpdateSystem(ctx context.Context, uuid uuid.UUID) error
}
