package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/controllers/model/request"
	"github.com/luuisavelino/level-control-system/src/models"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) AddSystem(c *gin.Context) {
	logger.Info("Init AddSystem controller",
		zap.String("journey", "AddSystem"),
	)

	var systemRequest request.SystemRequest

	if err := c.ShouldBindJSON(&systemRequest); err != nil {
		logger.Info("Error to bind request",
			zap.String("journey", "AddSystem"),
			zap.String("file", "add_system.go"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	domain := models.NewSystemDomain(
		systemRequest.Name,
		systemRequest.Path,
		systemRequest.Description,
		systemRequest.Setpoint,
		systemRequest.MinLevel,
		systemRequest.MaxLevel,
		systemRequest.ControlType,
		systemRequest.Gains,
	)

	system, err := sc.service.AddSystem(c.Request.Context(), domain)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	logger.Info("Success add system",
		zap.String("journey", "AddSystem"),
		zap.String("file", "add_system.go"),
	)

	c.JSON(http.StatusOK, system)
}
