const mysql = require('mysql')
const {
	MYSQL_CONF
} = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行sql的函数
// 可能会疑惑这里没有数据库的关闭操作，是不是不安全，
// 因为我们这里是通过promise操作的，如果这里我们关闭了数据库，后面就无法获取数据，会报错

function exec(sql) {
	const promise = new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) return reject(err)
			return resolve(result)
		})
	})
	return promise
}

module.exports = {
	exec
}
