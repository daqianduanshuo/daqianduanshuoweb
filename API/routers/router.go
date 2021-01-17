package routers

import (
	"github.com/gin-gonic/gin"
)

// InitRouter 初始化路由
func InitRouter() {
	r := gin.Default()

	admin := r.Group("/admin")
	{
		admin.GET("/articles", GetArticles)            //获取文章列表
		admin.POST("/articles", PostArticle)           //新增文章
		admin.GET("/articles/:id", GetArticleByID)     //查看详情
		admin.POST("/articles/:id", UpdateArticleByID) //修改详情
	}

	api := r.Group("/api")
	{
		api.GET("/articles", GetArticles)        //获取文章列表
		api.GET("/articles/:id", GetArticleByID) //查看详情
	}

	r.Run()

}
