// 该项目是模拟实际的开发情形
// 因此我们需要根据不同的运行环境来进行区分不同的配置
// 当然在这里我们其实只有一种运行环境
// 那就是本地环境，但是我们写的需要规范
const env = process.env.NODE_ENV  // 环境参数

let MYSQL_CONF
let REDIS_CONF

// 本地环境
if (env === 'dev') {
    // mysql 配置
    MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root',
        database: 'myblog',
        port: 3306
    }
    // redis 配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

// 线上环境
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'myblog',
        port: 3306
    }
    // redis 配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
