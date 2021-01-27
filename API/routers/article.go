package routers

import (
	"net/http"
	"strconv"

	"API/service"
	"API/util"

	"github.com/gin-gonic/gin"
)

// GetArticles 获取文章列表
// @Summary 获取文章列表
// @Produce  json
// @Tags admin
// @Param pageIndex path int true "pageIndex"
// @Param pageSize path int true "pageSize"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/articles [get]
func GetArticles(c *gin.Context) {
	appG := util.Gin{C: c}
	pageIndex, _ := strconv.Atoi(c.Query("pageIndex"))
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))

	articles, _ := service.GetArticles(pageIndex-1, pageSize)
	total, err := service.GetCount()
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}

	data := make(map[string]interface{})
	data["lists"] = articles
	data["total"] = total
	data["pageIndex"] = pageIndex - 1
	data["pageSize"] = pageSize

	appG.Response(http.StatusOK, 200, data)

}

// PostArticle 新增文章
// @Summary 新增文章
// @Produce  json
// @Tags admin
// @Param data body int true "data"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/articles [post]
func PostArticle(c *gin.Context) {
	appG := util.Gin{C: c}
	msg, err := service.CreateArticle(c)
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, msg)
}

// GetArticleByID  查看详情
// @Summary 查看详情
// @Produce  json
// @Tags admin
// @Param id path int true "id"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/articles/:id [get]
func GetArticleByID(c *gin.Context) {
	appG := util.Gin{C: c}
	article, err := service.GetArticleByID(c.Param("id"))
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, article)
}

// UpdateArticleByID 修改详情
// @Summary 修改详情
// @Produce  json
// @Tags admin
// @Param id path int true "id"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/articles/:id [post]
func UpdateArticleByID(c *gin.Context) {
	appG := util.Gin{C: c}
	msg, err := service.UpdateArticleByID(c)
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, msg)
}
