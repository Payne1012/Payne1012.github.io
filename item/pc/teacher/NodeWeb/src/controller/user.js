const mysql = require('mysql')
const {
	MYSQL_CONF
} = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)
// 开始连接
con.connect()

const login = (username, password, res) => {
	let readSql = "SELECT * FROM user WHERE userName  = '" + username + "'";
	// 连接 SQL 并实施语句
	con.query(readSql, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (result == undefined || result.length == 0) { // 不存在用户
				res.end("不存在该用户!");
				return;
			} else { // 存在用户
				let newRes = JSON.parse(JSON.stringify(result));
				if (newRes[0].password == password) { // 密码正确
					// 返回数据
					res.write(JSON.stringify({
						code: "200",
						message: "登录成功！",
						data: {
							userId: newRes[0].userId,
							userName: newRes[0].userName
						}
					}));
					res.end();
				} else { // 密码错误
					// 返回数据
					res.write(JSON.stringify({
						code: "300",
						message: "登录失败，密码错误！"
					}));
					res.end();
				}
				// 判断密码正确与否完毕
			}
			// 存在用户处理结束
		}
	});
}

const register = (username, password, time, res) => {
	// 查询 user 表
	// 使用 Promise 的原因是因为中间调用了两次数据库，而数据库查询是异步的，所以需要用 Promise。
	new Promise((resolve, reject) => {
		// 新增的 SQL 语句及新增的字段信息
		let readSql = "SELECT * FROM user";
		// 连接 SQL 并实施语句
		con.query(readSql, function(error1, response1) {
	
			if (error1) { // 如果 SQL 语句错误
				throw error1;
			} else {
				// 将结果先去掉 RowDataPacket，再转换为 json 对象
				let newRes = JSON.parse(JSON.stringify(response1)); 
				// 判断姓名重复与否
				let userNameRepeat = false;
				for (let item in newRes) {
					if (newRes[item].userName == username) { 
						userNameRepeat = true;
					}
				}
				// 如果姓名重复
				if (userNameRepeat) {
					res.end("注册失败，姓名重复！");
					return;
				} else if (newRes.length > 300) { // 如果注册名额已满
					res.end("注册失败，名额已满！");
					return;
				} else { // 可以注册
					resolve();
				}
	
			}
		});
	
	}).then(() => {
		// 新增的 SQL 语句及新增的字段信息
		let addSql = "INSERT INTO user(userName, password, time) VALUES(?,?,?)";
	
		let addSqlParams = [username, password, time];
	
		// 连接 SQL 并实施语句
		con.query(addSql, addSqlParams, function(error2, response2) {
			if (error2) { // 如果 SQL 语句错误
				console.log("新增错误：");
				console.log(error2);
				return;
			} else {
				// 返回数据
				res.write(JSON.stringify({
					code: "200",
					message: "注册成功！"
				}));
				// 结束响应
				res.end();
			}
		});
	
	})
	// Promise 结束
}

module.exports = {
	login,
	register
}
