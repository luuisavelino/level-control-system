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
