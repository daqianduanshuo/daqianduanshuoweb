package service

import (
	"API/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// GetArticles 获取文章总数
func GetArticles(pageNum int, pageSize int) ([]*models.Article, error) {
	var articles []*models.Article
	err := models.DB.Offset(pageNum * pageSize).Limit(pageSize).Order(" id desc ").Preload("Tags").Find(&articles).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}
	return articles, nil
}

// GetCount 获取文章总数
func GetCount() (int32, error) {
	var articles []*models.Article
	var totalSize int32
	err := models.DB.Model(&articles).Count(&totalSize).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return 0, err
	}
	return totalSize, nil
}

// CreateArticle 创建文章
func CreateArticle(c *gin.Context) (string, error) {
	var json models.Article
	if err := c.ShouldBindJSON(&json); err != nil {
		return "", err
	}
	article := models.Article{Content: json.Content, Videos: json.Videos, Tags: json.Tags}
	models.DB.Create(&article)
	return "success", nil
}

//GetArticleByID 文章详情
func GetArticleByID(id string) (*models.Article, error) {
	var article models.Article
	if err := models.DB.Where("id = ?", id).Preload("Tags").First(&article).Error; err != nil {
		return nil, err
	}
	return &article, nil
}

//UpdateArticleByID 文章详情更新
func UpdateArticleByID(c *gin.Context) (string, error) {
	var article models.Article
	var input models.Article
	if err := models.DB.Where("id = ?", c.Param("id")).Preload("Tags").First(&article).Error; err != nil {
		return "", err
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		return "", err
	}

	models.DB.Model(&article).Association("Tags").Clear()
	models.DB.Model(&article).Updates(input)
	return "success", nil

}
