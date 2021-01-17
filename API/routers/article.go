package routers

import (
	"net/http"
	"strconv"

	"API/service"

	"github.com/gin-gonic/gin"
)

// GetArticles 获取文章列表
func GetArticles(c *gin.Context) {

	pageIndex, _ := strconv.Atoi(c.Query("pageIndex"))
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))

	articles, _ := service.GetArticles(pageIndex, pageSize)
	total, err := service.GetCount()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := make(map[string]interface{})
	data["lists"] = articles
	data["total"] = total
	data["pageIndex"] = pageIndex
	data["pageSize"] = pageSize

	c.JSON(http.StatusOK, data)

}

// PostArticle 新增文章
func PostArticle(c *gin.Context) {
	msg, err := service.CreateArticle(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"msg": msg})
}

// GetArticleByID  查看详情
func GetArticleByID(c *gin.Context) {

	article, err := service.GetArticleByID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": article})
}

// UpdateArticleByID 修改详情
func UpdateArticleByID(c *gin.Context) {
	msg, err := service.UpdateArticleByID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"msg": msg})
}
