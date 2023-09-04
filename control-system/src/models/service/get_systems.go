package service

import (
	"context"
	"fmt"
)

func (ss *systemServiceInterface) GetSystems(ctx context.Context) (string, error) {
	fmt.Println("GetSystems")

	workers := ss.manager.GetWorkersUUID()

	fmt.Println(workers)

	return "sucesso", nil
}
