package model

import (
	"time"

	guuid "github.com/google/uuid"
)

type User struct {
	ID        guuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Username  string     `json:"username"`
	Password  string     `json:"-"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
}
