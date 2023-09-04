package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (ss *systemServiceInterface) GetSystemByUUID(ctx context.Context, uuid uuid.UUID) (string, error) {
	fmt.Println("GetSystemByUUID")

	return "sucesso", nil
}
