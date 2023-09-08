package models

type SystemDomainInterface interface {
	GetPath() string
	GetSetpoint() float64
	GetMinLevel() float64
	GetMaxLevel() float64
	GetControlType() string
	GetGains() map[string]float64
}

func NewSystemDomain(
	path string,
	setpoint, minLevel, maxLevel float64,
	controlType string,
	gains map[string]float64,
) SystemDomainInterface {
	return &systemDomain{
		path: path,
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
