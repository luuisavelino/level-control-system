package algorithm

type pid struct {
	setpoint float64
	kp       float64
	ki       float64
	kd       float64
}

// Compute returns the control signal for the given current level.
func (p pid) Compute(currentLevel float64) float64 {
	var (
		e = p.setpoint - currentLevel
		u = p.kp*e + p.ki*e + p.kd*e
	)

	return u
}
