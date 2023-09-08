package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/luuisavelino/level-control-system/src/controllers"
)

func InitRoutes(r *gin.RouterGroup, controller controllers.SystemControllerInterface) {
	v1 := r.Group("/api/v1")
	{
		v1.POST("/systems", controller.AddSystem)
		v1.DELETE("/systems/:uuid", controller.RemoveSystem)
		v1.PUT("/systems/:uuid", controller.UpdateSystem)
	}
}
