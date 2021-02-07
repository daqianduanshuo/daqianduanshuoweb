package service

import (
	"API/models"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// GetRoadMaps 获取路线图
func GetRoadMaps(roadmaptype string) ([]*models.Roadmap, error) {
	var roadmaps []*models.Roadmap
	if roadmaptype == "" {
		err := models.DB.Find(&roadmaps).Error
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, err
		}
	} else {
		err := models.DB.Where("type = ?", roadmaptype).Find(&roadmaps).Error
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}
	return roadmaps, nil
}

// CreateRoadMap 创建路线图
func CreateRoadMap(c *gin.Context) (string, error) {
	var json models.Roadmap
	if err := c.ShouldBindJSON(&json); err != nil {
		return "", err
	}
	fmt.Println(json.Weight, json)
	model := models.Roadmap{Title: json.Title, Content: json.Content, Type: json.Type, Weight: json.Weight}
	models.DB.Create(&model)
	return "success", nil
}

//GetRoadMapByID 路线图详情
func GetRoadMapByID(id string) (*models.Roadmap, error) {
	var roadmap models.Roadmap
	if err := models.DB.Where("id = ?", id).First(&roadmap).Error; err != nil {
		return nil, err
	}
	return &roadmap, nil
}

//UpdateRoadMapByID 路线图详情更新
func UpdateRoadMapByID(c *gin.Context) (string, error) {
	var roadmap models.Roadmap
	var input models.Roadmap
	if err := models.DB.Where("id = ?", c.Param("id")).First(&roadmap).Error; err != nil {
		return "", err
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		return "", err
	}
	models.DB.Model(&roadmap).Updates(input)
	return "success", nil

}
