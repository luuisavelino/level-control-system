package service

import (
	"context"
	"fmt"

	"github.com/luuisavelino/level-control-system/src/models"
)

func (ss *systemServiceInterface) DeleteSystem(ctx context.Context, systemDomain models.SystemDomainInterface) error {
	fmt.Println("AddSystem")

	return nil
}
