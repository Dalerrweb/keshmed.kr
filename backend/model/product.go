package model

import (
	"time"

	guuid "github.com/google/uuid"
	"gorm.io/gorm"
)

type Product struct {
	ID           guuid.UUID     `gorm:"type:uuid;primaryKey" json:"id"`
	Name         string         `json:"name" validate:"required,min=3,max=100"`
	Category     string         `json:"category"`
	Price        float64        `json:"price,omitempty" validate:"gte=0"`
	Amount       float64        `json:"amount" validate:"required,gte=0"`
	Image        string         `json:"image" validate:"omitempty,min=5"`
	SearchVector string         `gorm:"type:tsvector;index" json:"-"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
}
