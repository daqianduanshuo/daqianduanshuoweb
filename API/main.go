package main

import (
	"API/models"
	"API/routers"
)

// @title 接口
// @host 127.0.0.1:8080
func main() {
	models.Setup()
	routers.InitRouter()
}
