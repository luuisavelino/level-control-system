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
			controlType: "PID",
			gains:       gains,
		},
	}
}

type systemDomain struct {
	name        string
	path        string
	description string
	scheme      scheme
	control     control
}

type scheme struct {
	setpoint float64
	minLevel float64
	maxLevel float64
}

type control struct {
	controlType string
	gains       map[string]float64
}

func (sd *systemDomain) GetPath() string {
	return sd.path
}

func (sd *systemDomain) GetName() string {
	return sd.name
}

func (sd *systemDomain) GetDescription() string {
	return sd.description
}

func (sd *systemDomain) GetSetpoint() float64 {
	return sd.scheme.setpoint
}

func (sd *systemDomain) GetMinLevel() float64 {
	return sd.scheme.minLevel
}

func (sd *systemDomain) GetMaxLevel() float64 {
	return sd.scheme.maxLevel
}

func (sd *systemDomain) GetControlType() string {
	return sd.control.controlType
}

func (sd *systemDomain) GetGains() map[string]float64 {
	return sd.control.gains
}
