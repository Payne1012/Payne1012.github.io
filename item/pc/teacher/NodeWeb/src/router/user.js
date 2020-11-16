const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method
    // 登录
    if (method === 'POST' && req.path === "/api/user/login") {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                // 每次登陆成功后需要把用户信息存储到Redis中去，这样就算服务器重启也不会影响之前的登录信息，因为redis和后端服务器也是分离的
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('用户登录失败')
        })
    }
}

module.exports = handleUserRouter