package repository

import (
	"context"

	"github.com/jinzhu/gorm"
	"github.com/luuisavelino/level-control-system/src/models"
)

type systemRepository struct {
	conn *gorm.DB
}

func NewSystemRepository(conn *gorm.DB) systemRepository {
	return systemRepository{
		conn: conn,
	}
}

type SystemRepository interface {
	SaveSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error
}

// func (sd models.SystemDomainInterface) DomainToSystem() SystemEntity {
// 	return SystemEntity{
// 		Name:        sd.name,
// 		Path:        sd.path,
// 		Description: sd.description,
// 	}
// }

// func (sd models.SystemDomainInterface) DomainToScheme() SchemeEntity {
// 	return SchemeEntity{
// 		Setpoint: sd.scheme.setpoint,
// 		MinLevel: sd.scheme.minLevel,
// 		MaxLevel: sd.scheme.maxLevel,
// 	}
// }

// func (sd models.SystemDomainInterface) DomainToControl() ControlEntity {
// 	return ControlEntity{
// 		Type: sd.control.controlType,
// 		Kp:   sd.control.gains["Kp"],
// 		Ki:   sd.control.gains["Ki"],
// 		Kd:   sd.control.gains["Kd"],
// 	}
// }
