package main

import (
	"API/models"
	"API/routers"
)

func main() {
	models.Setup()
	routers.InitRouter()
}
