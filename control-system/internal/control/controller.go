package control

type Control interface {
	Compute(currentLevel float64) float64
}

func NewControl(controleType string, setpoint float64, gains map[string]float64) Control {
	switch controleType {
	case "pd":
		return pd{
			setpoint: setpoint,
			kp: gains["kp"],
			kd: gains["kd"],
		}
	case "pi":
		return pi{
			setpoint: setpoint,
			kp: gains["kp"],
			ki: gains["ki"],
		}
	case "pid":
		return pid{
			setpoint: setpoint,
			kp: gains["kp"],
			ki: gains["ki"],
			kd: gains["kd"],
		}
	default:
		return nil
	}
}
