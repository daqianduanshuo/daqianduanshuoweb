package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// Article Model
type Article struct {
	gorm.Model `json:"-"`
	Content    string `gorm:"text" json:"content" binding:"required"`
	Videos     string `gorm:"varchar(2048)" json:"videos" binding:"required"`
	Tags       []Tag  `json:"tags" binding:"required"`
}

// Tag Model
type Tag struct {
	gorm.Model `json:"-"`
	TagName    string `json:"tagname"`
	ArticleID  uint   `json:"-"`
}
