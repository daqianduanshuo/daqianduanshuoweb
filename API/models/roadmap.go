package models

import (
	"time"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// RoadOwnModel Model
type RoadOwnModel struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	DeletedAt time.Time `json:"-"`
}

// Roadmap Model
type Roadmap struct {
	RoadOwnModel
	Title   string `gorm:"varchar(256)" json:"title" binding:"required"`
	Content string `gorm:"text" json:"content" binding:"required"`
	Type    string `gorm:"varchar(256)" json:"type" binding:"required"`
	Weight  string `gorm:"varchar(256)" json:"weight" binding:"required"`
}
