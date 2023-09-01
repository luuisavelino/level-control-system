package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (sc *systemControllerInterface) DeleteSystem(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": "sistema iniciado",
	})

	uuid, _ := uuid.Parse(c.Param("uuid"))

	err := sc.service.DeleteSystem(uuid)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
}
