package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// User 有多张 CreditCard，UserID 是外键
type Article struct {
	gorm.Model `json:"-"`
	Content    string `gorm:"text"json:"content"binding:"required"`
	Videos     string `gorm:"varchar(2048)"json:"videos"binding:"required"`
	Tags       []Tag  `json:"tags"binding:"required"`
}

type Tag struct {
	gorm.Model `json:"-"`
	TagName    string `json:"tagname"`
	ArticleID  uint   `json:"-"`
}

func main() {

	r := gin.Default()

	db, err := gorm.Open("mysql", "root:root@(127.0.0.1:8889)/webdev?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic("failed to connect database")
	}

	r.GET("/admin/articles", func(c *gin.Context) {
		var articles []Article
		pageIndex, _ := strconv.Atoi(c.Query("pageIndex"))
		pageSize, _ := strconv.Atoi(c.Query("pageSize"))
		db.Offset(pageIndex * pageSize).Limit(pageSize).Preload("Tags").Find(&articles)
		var totalSize int32
		db.Model(&articles).Count(&totalSize)
		c.JSON(http.StatusOK, gin.H{"data": articles, "pageIndex": pageIndex, "pageSize": pageSize, "totalSize": totalSize})
	})
	r.POST("/admin/articles", func(c *gin.Context) {
		var json Article
		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		} else {
			article := Article{Content: json.Content, Videos: json.Videos, Tags: json.Tags}
			db.Create(&article)
			c.JSON(http.StatusOK, gin.H{"msg": "success"})
		}
	})
	r.GET("/admin/articles/:id", func(c *gin.Context) {
		var article Article
		if err := db.Where("id = ?", c.Param("id")).Preload("Tags").First(&article).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": article})
	})
	r.POST("/admin/articles/:id", func(c *gin.Context) {
		var article Article
		if err := db.Where("id = ?", c.Param("id")).Preload("Tags").First(&article).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var input Article
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.Model(&article).Association("Tags").Clear()
		db.Model(&article).Updates(input)
		c.JSON(http.StatusOK, gin.H{"msg": "success"})
	})

	r.Run()

}
