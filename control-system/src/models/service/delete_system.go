package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (ss *systemServiceInterface) DeleteSystem(ctx context.Context, uuid uuid.UUID) error {
	fmt.Println("DeleteSystem")

	return nil
}
