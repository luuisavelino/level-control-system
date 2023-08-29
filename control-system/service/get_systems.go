package service

import (
	"fmt"
)

func (ss *systemServiceInterface) GetSystems() (string, error) {
	fmt.Println("GetSystems")
	return "sucesso", nil
}
