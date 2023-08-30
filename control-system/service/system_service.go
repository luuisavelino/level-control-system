package service

func NewSystemServiceInterface() SystemServiceInterface {
	return &systemServiceInterface{}
}

type systemServiceInterface struct {
}

type SystemServiceInterface interface {
	GetSystems() (string, error)
	AddSystem() error
}
