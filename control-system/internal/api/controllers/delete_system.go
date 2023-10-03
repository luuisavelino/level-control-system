package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) RemoveSystem(c *gin.Context) {
	logger.Info("Init RemoveSystem controller",
		zap.String("journey", "RemoveSystem"),
	)

	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		logger.Info("Error to get UUID from request",
			zap.String("journey", "RemoveSystem"),
			zap.String("file", "delete_system.go"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	err = sc.service.RemoveSystem(c.Request.Context(), uuid)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	logger.Info("Success delete system",
		zap.String("journey", "RemoveSystem"),
		zap.String("file", "delete_system.go"),
	)

	c.JSON(http.StatusOK, gin.H{
		"status": "success", "message": "sistem deleted",
	})
}
