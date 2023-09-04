package models

type SystemDomainInterface interface {
	GetPath() string
	GetName() string
	GetDescription() string
	GetSetpoint() float64
}

func (sc systemDomain) GetPath() string {
	return sc.path
}

func (sc systemDomain) GetName() string {
	return sc.name
}

func (sc systemDomain) GetDescription() string {
	return sc.description
}

func (sc systemDomain) GetSetpoint() float64 {
	return sc.scheme.setpoint
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
			gains: gains,
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
	gains map[string]float64
}
