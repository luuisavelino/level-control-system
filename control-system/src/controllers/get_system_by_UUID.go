package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (sc *systemControllerInterface) GetSystemByUUID(c *gin.Context) {
	uuid, err := uuid.Parse(c.Param("uuid"))
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	msg, err := sc.service.GetSystemByUUID(c.Request.Context(), uuid)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": msg,
	})
}
