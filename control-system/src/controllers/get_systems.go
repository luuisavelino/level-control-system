package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (sc *systemControllerInterface) GetSystems(c *gin.Context) {
	fmt.Println("GetSystems")
	msg, err := sc.service.GetSystems(c.Request.Context())
	if err != nil {
		fmt.Println("Err in GetSystems")
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": msg,
	})
}
