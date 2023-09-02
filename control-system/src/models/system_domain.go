package models

import "github.com/google/uuid"

type SystemDomainInterface interface {
	GetUUID() uuid.UUID
	GetPath() string
}

func NewSystemDomain(uuid uuid.UUID, path string) SystemDomainInterface {
	return &systemDomain{
		uuid: uuid,
		path: path,
	}
}

type systemDomain struct {
	uuid uuid.UUID
	path string
}

func (u *systemDomain) GetUUID() uuid.UUID {
	return u.uuid
}

func (u *systemDomain) GetPath() string {
	return u.path
}
