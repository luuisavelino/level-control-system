package converter

import (
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/repository/entity"
)

func ConvertDomainToEntity(
	system models.SystemDomainInterface,
) (entity.SystemsEntity, entity.ControlsEntity, entity.SchemesEntity) {
	return entity.SystemsEntity{
			Name:        system.GetName(),
			Path:        system.GetPath(),
			Description: system.GetDescription(),
		},
		entity.ControlsEntity{
			Type: system.GetControlType(),
			Kp:   system.GetGains()["kp"],
			Ki:   system.GetGains()["ki"],
			Kd:   system.GetGains()["kd"],
		},
		entity.SchemesEntity{
			Setpoint: system.GetSetpoint(),
			MinLevel: system.GetMinLevel(),
			MaxLevel: system.GetMaxLevel(),
		}
}
