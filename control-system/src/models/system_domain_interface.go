package models

type SystemDomainInterface interface {
	GetPath() string
	GetName() string
	GetDescription() string
	GetSetpoint() float64
	GetMinLevel() float64
	GetMaxLevel() float64
	GetControlType() string
	GetGains() map[string]float64
}

func NewSystemDomain(
	name, path, description string,
	setpoint, minLevel, maxLevel float64,
	controlType string,
	gains map[string]float64,
) SystemDomainInterface {
	return &systemDomain{
		name:        name,
		path:        path,
		description: description,
		scheme: scheme{
			setpoint: setpoint,
			minLevel: minLevel,
			maxLevel: maxLevel,
		},
		control: control{
			controlType: controlType,
			gains:       gains,
		},
	}
}
