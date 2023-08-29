package routes

import (
	"github.com/gin-gonic/gin"
)

const apiVersion = "/api/v1"

func InitRoutes(r *gin.RouterGroup, controller controllers.SystemControllerInterface) {
	r.GET(apiVersion + "/systems", controller.GetSystems)
}
