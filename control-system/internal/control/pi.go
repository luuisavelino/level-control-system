package control

type pi struct {
	setpoint float64
	kp       float64
	ki       float64
}

func (p pi) Compute(currentLevel float64) float64 {
	var (
		e = p.setpoint - currentLevel
		u = p.kp*e + p.ki*e
	)

	return u
}
