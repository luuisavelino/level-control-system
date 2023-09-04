package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"github.com/luuisavelino/level-control-system/src/controllers/model/request"
	"github.com/luuisavelino/level-control-system/src/models"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) EditSystem(c *gin.Context) {
	logger.Info("Init EditSystem controller",
		zap.String("journey", "EditSystem"),
	)

	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		logger.Info("Error to get UUID from request",
			zap.String("journey", "EditSystem"),
			zap.String("file", "edit_system.go"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	var systemRequest request.SystemRequest

	if err := c.ShouldBindJSON(&systemRequest); err != nil {
		logger.Info("Error to bind request",
			zap.String("journey", "EditSystem"),
			zap.String("file", "edit_system.go"),
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

	err = sc.service.EditSystem(c.Request.Context(), uuid, domain)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	logger.Info("Success edit system",
		zap.String("journey", "EditSystem"),
		zap.String("file", "edit_system.go"),
	)

	c.JSON(http.StatusOK, gin.H{
		"status": "success", "message": "sistem deleted",
	})
}
