const {
	login,
	register,
	adminLogin
} = require('../controller/user')
// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");


const handleUserRouter = (req, res) => {
	if (req.method === 'POST' && req.path === "/api/admin/login") { //登录
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		});
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result);
			let username = resdata.username; // 用户名
			let password = resdata.password; // 密码 
			adminLogin(username, password, res)
		})
	}
	
	if (req.method === 'POST' && req.path === "/api/user/login") { //登录 
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		});
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result);
			let username = resdata.username; // 用户名
			let password = resdata.password; // 密码 
			login(username, password, res)
		})
	}
	// 登录步骤结束
	if (req.method === 'POST' && req.path === "/api/user/register") { //登录
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		});
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result);
			let username = resdata.username; // 用户名
			let password = resdata.password; // 密码 
			let time = getNowFormatDate();
			if (!username) { // 用户名为空
				res.end("注册失败，用户名为空。");
				return;
			} else if (!password) { // 密码为空
				res.end("注册失败，密码为空！");
				return;
			} else if (username.length > 10) { // 姓名过长
				res.end("注册失败，姓名过长！");
				return;
			} else if (password.length > 20) { // 密码过长
				res.end("注册失败，密码过长！");
				return;
			} else {
				register(username, password, time, res)
			}
		})
	}
	// 登录步骤结束
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

module.exports = handleUserRouter