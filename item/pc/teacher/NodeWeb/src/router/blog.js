const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog,
    getSession
} = require('../controller/blog')  // 解构赋值的方式直接取相应的方法
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
// 去查看之前的登录状态，这里就简单判断了用户名是否存在
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {

        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // 这里的操作是为了让用登录后查看的是自己的列表在admin.html页面的时候
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req)

            if (loginCheckResult) {
                // 如果有值表示未登录
                return loginCheckResult
            }
            author = req.session.username
        }
        // 调用方法获取博客列表
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if (method === "GET" && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 新建一篇博客
    if (method === "POST" && req.path === "/api/blog/new") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果有值表示未登录
            return loginCheckResult
        }
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新一篇博客
    if (method === "POST" && req.path === "/api/blog/update") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果有值表示未登录
            return loginCheckResult
        }
        const result = updataBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })

    }

    // 删除一篇博客
    if (method === "POST" && req.path === "/api/blog/del") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 如果有值表示未登录
            return loginCheckResult
        }
        const author = req.session.username

        console.log(id, author)

        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter
