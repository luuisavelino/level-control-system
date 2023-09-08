package converter

import (
	"github.com/luuisavelino/level-control-system/src/models"
	"github.com/luuisavelino/level-control-system/src/models/repository/entity"
)

func ConvertEntityToDomain(
	systems entity.SystemsEntity,
	controls entity.ControlsEntity,
	schemes entity.SchemesEntity,
) models.SystemDomainInterface {
	gains := make(map[string]float64)
	if controls.Kp != 0 {
		gains["kp"] = controls.Kp
	}
	if controls.Ki != 0 {
		gains["ki"] = controls.Ki
	}
	if controls.Kd != 0 {
		gains["kd"] = controls.Kd
	}

	return models.NewSystemDomain(
		systems.Path,
		schemes.Setpoint,
		schemes.MinLevel,
		schemes.MaxLevel,
		controls.Type,
		gains,
	)
}
