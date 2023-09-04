package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) GetSystemByUUID(c *gin.Context) {
	logger.Info("Init GetSystemByUUID controller",
		zap.String("journey", "GetSystemByUUID"),
	)

	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		logger.Info("Error to get UUID from request",
			zap.String("journey", "GetSystemByUUID"),
			zap.String("file", "get_system_by_UUID.go"),
		)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	system, err := sc.service.GetSystemByUUID(c.Request.Context(), uuid)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	logger.Info("Success get system by UUID",
		zap.String("journey", "GetSystemByUUID"),
		zap.String("file", "get_system_by_UUID.go"),
	)

	c.JSON(http.StatusOK, system)
}
