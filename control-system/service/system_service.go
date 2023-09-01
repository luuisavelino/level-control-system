package service

import "github.com/google/uuid"

func NewSystemServiceInterface() SystemServiceInterface {
	return &systemServiceInterface{}
}

type systemServiceInterface struct {
}

type SystemServiceInterface interface {
	AddSystem() error
	GetSystems() (string, error)
	DeleteSystem(uuid.UUID) error
}
