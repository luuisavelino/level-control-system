package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) UpdateSystem(c *gin.Context) {
	logger.Info("Init EditSystem controller",
		zap.String("journey", "UpdateSystem"),
	)

	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		logger.Info("Error to get UUID from request",
			zap.String("journey", "UpdateSystem"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	err = sc.service.UpdateSystem(c.Request.Context(), uuid)
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
