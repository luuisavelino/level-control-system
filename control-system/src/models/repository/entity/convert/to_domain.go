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
	if controls.Kp.Float64 != 0 {
		gains["kp"] = controls.Kp.Float64
	}
	if controls.Ki.Float64 != 0 {
		gains["ki"] = controls.Ki.Float64
	}
	if controls.Kd.Float64 != 0 {
		gains["kd"] = controls.Kd.Float64
	}

	return models.NewSystemDomain(
		systems.Path.String,
		schemes.Setpoint.Float64,
		schemes.MinLevel.Float64,
		schemes.MaxLevel.Float64,
		controls.Type.String,
		gains,
	)
}
