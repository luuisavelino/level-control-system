package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/src/models/service"
)

type SystemControllerInterface interface {
	AddSystem(c *gin.Context)
	RemoveSystem(c *gin.Context)
	UpdateSystem(c *gin.Context)
	// StartSystemV2(c *gin.Context)
	// StopSystemV2(c *gin.Context)
}

type systemControllerInterface struct {
	service service.SystemServiceInterface
}

func NewSystemControllerInterface(serviceInterface service.SystemServiceInterface) SystemControllerInterface {
	return &systemControllerInterface{
		service: serviceInterface,
	}
}
