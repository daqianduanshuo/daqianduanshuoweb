package routers

import (
	"github.com/gin-gonic/gin"

	_ "API/docs"

	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// InitRouter 初始化路由
func InitRouter() {
	r := gin.Default()
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	admin := r.Group("/admin")
	{
		admin.GET("/articles", GetArticles)            //获取文章列表
		admin.POST("/articles", PostArticle)           //新增文章
		admin.GET("/articles/:id", GetArticleByID)     //查看详情
		admin.POST("/articles/:id", UpdateArticleByID) //修改详情

		admin.GET("/roadmaps", GetRoadMaps)            //获取路线图列表
		admin.POST("/roadmaps", PostRoadMaps)          //新增路线图
		admin.GET("/roadmaps/:id", GetRoadMapByID)     //查看路线图详情
		admin.POST("/roadmaps/:id", UpdateRoadMapByID) //修改路线图详情

	}

	api := r.Group("/api")
	{
		api.GET("/articles", GetArticles)        //获取文章列表
		api.GET("/articles/:id", GetArticleByID) //查看详情

		api.GET("/roadmaps", GetRoadMaps) //获取路线图列表
	}

	r.Run()

}
