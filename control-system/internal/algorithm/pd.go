package algorithm

type pd struct {
	setpoint float64
	kp       float64
	kd       float64
}

func (p pd) Compute(currentLevel float64) float64 {
	var (
		e = p.setpoint - currentLevel
		u = p.kp*e + p.kd*e
	)

	return u
}
