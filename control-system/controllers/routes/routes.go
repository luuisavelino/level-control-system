package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/controllers"
)

const apiVersion = "/api/v1"

func InitRoutes(r *gin.RouterGroup, controller controllers.SystemControllerInterface) {
	r.GET(apiVersion + "/systems", controller.GetSystems)
	r.POST(apiVersion + "/systems", controller.AddSystem)
}
