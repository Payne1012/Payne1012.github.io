const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
// 引入 http 模块：http 是提供 Web 服务的基础
const http = require("http");

// 引入 url 模块：url 是对用户提交的路径进行解析
const url = require("url");

// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");

var express = require('express');
var router = express.Router();
var fs = require("fs");
// 引入导入模块
const multiparty = require('multiparty');

// 设置返回格式 JSON
const serverHandle = (req, res) => {
	// 设置 cors 跨域
	res.setHeader("Access-Control-Allow-Origin", "*");
	// 设置 header 类型
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	// 跨域允许的请求方式
	res.setHeader('Content-Type', 'application/json');

	req.path = url.parse(req.url, true).pathname

	// 获取请求参数，增加true后会转换成一个对象
	req.query = url.parse(req.url, true).query

		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			return
		}
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			return
		}
}

// 获取当前时间
function getNowFormatDate() {
	var date = new Date();
	var year = date.getFullYear(); // 年
	var month = date.getMonth() + 1; // 月
	var strDate = date.getDate(); // 日
	var hour = date.getHours(); // 时
	var minute = date.getMinutes(); // 分
	var second = date.getMinutes(); // 秒
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	// 返回 yyyy-mm-dd hh:mm:ss 形式
	var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
	return currentdate;
}

 
module.exports = serverHandle
