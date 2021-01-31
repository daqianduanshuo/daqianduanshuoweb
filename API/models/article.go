package models

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// OwnModel Model
type OwnModel struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"create_at"`
	UpdatedAt time.Time  `json:"-"`
	DeletedAt *time.Time `type:timestamp; default: NOW(); json:"-"`
}

// Article Model
type Article struct {
	OwnModel
	Title   string `gorm:"varchar(256)" json:"title" binding:"required"`
	Content string `gorm:"text" json:"content" binding:"required"`
	Videos  string `gorm:"varchar(2048)" json:"videos" binding:"required"`
	Tags    []Tag  `json:"tags" binding:"required"`
}

// Tag Model
type Tag struct {
	gorm.Model `json:"-"`
	TagName    string `json:"tagname"`
	ArticleID  uint   `json:"-"`
}
