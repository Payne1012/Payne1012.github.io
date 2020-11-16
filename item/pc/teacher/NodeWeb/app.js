const urlObj = require('url')
const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const { set, get } = require('./src/db/redis')

// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    // console.log(d.toGMTString())
    return d.toGMTString()
}

// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            return resolve({})
        }
        if (req.headers['content-type'] !== 'application/json') {
            return resolve({})
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            // console.log(postData)
            if (!postData) return resolve({})
            return resolve(JSON.parse(postData))
        })
    })
    return promise
}

// 设置返回格式 JSON
const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json')
    req.path = urlObj.parse(req.url, true).pathname
	
    // 获取请求参数，增加true后会转换成一个对象
    req.query = urlObj.parse(req.url, true).query

    // 处理cookie
    // 因为cookie是也是一些键值对的方式，但是是字符串的形式，因此需要做如下处理
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        // console.log(key, val) 
        req.cookie[key] = val
    })

    // 解析session
    let needSetCookie = false
    let userId = req.cookie.userid

    req.sessionId = userId

    // 登录状态的保持，每次进行路由前会去判断一下用户之前是否登录了（如果执行一些增删改的操作）
    // 从redis中去获取数据，类似数据库的获取操作，因为这是一个异步的操作，因此我们就需要把后续的操作放到then里去保证我之前的数据已经获取了（用户信息）
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            set(req.sessionId, {})
            req.session = {}
        }
        else {
            req.session = sessionData
        }
        // 处理post数据
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                // 第一次请求的时候就把cookie设置了响应回去
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`) 
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`) 
                }
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未命中路由 返回404
        res.writeHead(404, {
            'content-type': 'text/plain'
        })
        res.end("404 Not Found\n")
    })

}
module.exports = serverHandle
