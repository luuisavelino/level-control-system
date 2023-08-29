package controllers

import (
	"github.com/gin-gonic/gin"
)

type SystemControllerInterface interface {
	GetSystems(c *gin.Context)
}

type systemControllerInterface struct {
	service service.NewSystemServiceInterface
}

func NewSystemControllerInterface(serviceInterface service.NewSystemServiceInterface) SystemControllerInterface {
	return &systemControllerInterface{
		service: serviceInterface,
	}
}