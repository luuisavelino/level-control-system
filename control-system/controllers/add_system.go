package controllers

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

func (sc *systemControllerInterface) AddSystem(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": "sistema iniciado",
	})

	err := sc.service.AddSystem()
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
}
