package util

import (
	"github.com/gin-gonic/gin"
)

type Gin struct {
	C *gin.Context
}

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

// GetMsg get error information based on Code
func GetMsg(code int) string {
	var MsgFlags = map[int]string{
		200: "ok",
		500: "fail",
		400: "请求参数错误",
	}
	msg, ok := MsgFlags[code]
	if ok {
		return msg
	}
	return ""
}

// Response setting gin.JSON
func (g *Gin) Response(httpCode, errCode int, data interface{}) {
	g.C.JSON(httpCode, Response{
		Code: errCode,
		Msg:  GetMsg(errCode),
		Data: data,
	})
	return
}
