package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/src/models/service"
)

type SystemControllerInterface interface {
	GetSystems(c *gin.Context)
	AddSystem(c *gin.Context)
	DeleteSystem(c *gin.Context)
}

type systemControllerInterface struct {
	service service.SystemServiceInterface
}

func NewSystemControllerInterface(serviceInterface service.SystemServiceInterface) SystemControllerInterface {
	return &systemControllerInterface{
		service: serviceInterface,
	}
}
