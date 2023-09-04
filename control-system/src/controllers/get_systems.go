package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/pkg/logger"
	"go.uber.org/zap"
)

func (sc *systemControllerInterface) GetSystems(c *gin.Context) {
	logger.Info("Init GetSystems controller",
		zap.String("journey", "GetSystems"),
	)

	systems, err := sc.service.GetSystems(c.Request.Context())
	if err != nil {
		logger.Info("Error to get systems",
			zap.String("journey", "GetSystems"),
			zap.String("file", "get_systems.go"),
		)

		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, systems)
}
