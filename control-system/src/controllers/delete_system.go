package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (sc *systemControllerInterface) DeleteSystem(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Status": "success", "Message": "sistema iniciado",
	})

	// uuid, _ := uuid.Parse(c.Param("uuid"))

	err := sc.service.DeleteSystem(c.Request.Context(), nil)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, err)
		return
	}
}
