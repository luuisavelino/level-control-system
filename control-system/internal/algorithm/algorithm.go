package algorithm

type Algorithm interface {
	Compute(currentLevel float64) float64
}

func NewAlgorithm(controleType string, setpoint float64, gains map[string]float64) Algorithm {
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
