package models

import (
	"fmt"
	"log"

	"github.com/go-ini/ini"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB val
var DB *gorm.DB

// Setup func
func Setup() {

	cfg, err := ini.Load("conf/app.ini")
	if err != nil {
		log.Fatalf("setting.Setup, fail to parse 'conf/app.ini': %v", err)
	}

	ip := cfg.Section("mysql").Key("ip").String()
	port := cfg.Section("mysql").Key("port").String()
	user := cfg.Section("mysql").Key("user").String()
	password := cfg.Section("mysql").Key("password").String()
	database := cfg.Section("mysql").Key("database").String()

	DB, err = gorm.Open("mysql", fmt.Sprintf("%s:%s@(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		user,
		password,
		ip,
		port,
		database))

	if err != nil {
		panic("failed to connect database")
	}
	DB.LogMode(true)
}

// CloseDB db
func CloseDB() {
	defer DB.Close()
}
