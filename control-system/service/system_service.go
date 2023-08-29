package service

import (
	"github.com/luuisavelino/level-control-system"
)

func NewSystemServiceInterface() SystemServiceInterface {
	return &systemServiceInterface{}
}

type systemServiceInterface struct {
}

type SystemServiceInterface interface {
	GetSystems() (string, error)
}
