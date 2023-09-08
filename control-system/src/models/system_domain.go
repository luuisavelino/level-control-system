package models

type systemDomain struct {
	path    string
	scheme  scheme
	control control
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
