const {
	getList,
	getDetail,
	newBlog,
	updataBlog,
	delBlog
} = require('../controller/blog')  // 解构赋值的方式直接取相应的方法

const handleBlogRouter = (req, res) => {
	const method = req.method
	const id = req.query.id
	// 获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		let author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// 调用方法获取博客列表
		const result = getList(author, keyword)
	}
	// 获取博客详情
	if (method === "GET" && req.path === '/api/blog/detail') {
		const result = getDetail(id)
	}
	// 新建一篇博客
	if (method === "POST" && req.path === "/api/blog/new") {
		const result = newBlog(req.body)
	}
	// 更新一篇博客
	if (method === "POST" && req.path === "/api/blog/update") {
		const result = updataBlog(id, req.body)
	}
	// 删除一篇博客
	if (method === "POST" && req.path === "/api/blog/del") {
		const author = req.session.username
		const result = delBlog(id, author) 
	}
}
module.exports = handleBlogRouter