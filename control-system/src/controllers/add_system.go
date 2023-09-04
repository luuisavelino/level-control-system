package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/src/controllers/model/request"
	"github.com/luuisavelino/level-control-system/src/models"
)

func (sc *systemControllerInterface) AddSystem(c *gin.Context) {
	fmt.Println("AddSystem")
	var systemRequest request.SystemRequest

	if err := c.ShouldBindJSON(&systemRequest); err != nil {
		fmt.Println(err)
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

	fmt.Println("domain:", domain)

	err := sc.service.AddSystem(c.Request.Context(), domain)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": "sistema iniciado",
	})
}
