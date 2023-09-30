package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/api/models"
	"gorm.io/gorm"
)

type systemRepository struct {
	db *gorm.DB
}

func NewSystemRepository(db *gorm.DB) systemRepository {
	return systemRepository{
		db: db,
	}
}

type SystemRepository interface {
	GetSystem(ctx context.Context, uuid uuid.UUID) (models.SystemDomainInterface, error)
}
