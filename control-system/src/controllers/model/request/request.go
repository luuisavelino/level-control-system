package request

type SystemRequest struct {
	Name         string  `json:"name" binding:"required"`
	Path         string  `json:"path" binding:"required"`
	Description  string  `json:"description" binding:"required"`
	Setpoint     float64 `json:"setpoint" binding:"required"`
	MinLevel     float64 `json:"min_level" binding:"required"`
	MaxLevel     float64 `json:"max_level" binding:"required"`
	ControlType  string  `json:"control_type" binding:"required"`
	Gains        map[string]float64  `json:"gains" binding:"required"`
}

type SystemRequest2 struct {
	Name         string  `json:"name"`
	Path         string  `json:"path"`
	Description  string  `json:"description"`
	Setpoint     float64 `json:"setpoint"`
	MinLevel     float64 `json:"min_level"`
	MaxLevel     float64 `json:"max_level"`
	ControlType  string  `json:"control_type"`
	Gains        map[string]float64  `json:"gains"`
}
