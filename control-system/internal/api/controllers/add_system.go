package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/internal/config/logger"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) AddSystem(c *gin.Context) {
	logger.Info("Init AddSystem controller",
		zap.String("journey", "AddSystem"),
	)

	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		logger.Info("Error to get UUID from request",
			zap.String("journey", "AddSystem"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	err = sc.service.AddSystem(c.Request.Context(), uuid)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	logger.Info("Success add system",
		zap.String("journey", "AddSystem"),
	)

	c.JSON(http.StatusOK, gin.H{})
}
