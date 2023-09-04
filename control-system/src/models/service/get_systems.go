package service

import (
	"context"
	"fmt"
)

func (ss *systemServiceInterface) GetSystems(ctx context.Context) (string, error) {
	fmt.Println("GetSystems")
	return "sucesso", nil
}
