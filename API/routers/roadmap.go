package routers

import (
	"net/http"

	"API/service"
	"API/util"

	"github.com/gin-gonic/gin"
)

// GetRoadMaps 获取路线图列表
// @Summary 获取路线图列表
// @Produce  json
// @Tags admin
// @Param pageIndex path int true "pageIndex"
// @Param pageSize path int true "pageSize"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/roadmaps [get]
func GetRoadMaps(c *gin.Context) {
	appG := util.Gin{C: c}

	roadmaptype := c.Query("type")

	articles, err := service.GetRoadMaps(roadmaptype)
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}

	data := make(map[string]interface{})
	data["lists"] = articles
	appG.Response(http.StatusOK, 200, data)

}

// PostRoadMaps 新增路线图
// @Summary 新增路线图
// @Produce  json
// @Tags admin
// @Param data body int true "data"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/roadmaps [post]
func PostRoadMaps(c *gin.Context) {
	appG := util.Gin{C: c}
	msg, err := service.CreateRoadMap(c)
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, msg)
}

// GetRoadMapByID  查看路线图详情
// @Summary 查看路线图详情
// @Produce  json
// @Tags admin
// @Param id path int true "id"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/roadmaps/:id [get]
func GetRoadMapByID(c *gin.Context) {
	appG := util.Gin{C: c}
	article, err := service.GetRoadMapByID(c.Param("id"))
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, article)
}

// UpdateRoadMapByID 修改路线图详情
// @Summary 修改路线图详情
// @Produce  json
// @Tags admin
// @Param id path int true "id"
// @Success 200 {object} util.Response
// @Failure 400 {object} util.Response
// @Router /admin/roadmaps/:id [post]
func UpdateRoadMapByID(c *gin.Context) {
	appG := util.Gin{C: c}
	msg, err := service.UpdateRoadMapByID(c)
	if err != nil {
		appG.Response(http.StatusBadRequest, 400, err.Error())
		return
	}
	appG.Response(http.StatusOK, 200, msg)
}
