const {
	getList,
	getDetail,
	newBlog,
	updataBlog,
	delBlog
} = require('../controller/blog') // 解构赋值的方式直接取相应的方法
// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");
const handleBlogRouter = (req, res) => {
	const method = req.method
	const id = req.query.id
	// 获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		let author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// 调用方法获取博客列表
		const result = getList(res,author, keyword)
	}
	// 获取博客详情
	if (method === "GET" && req.path === '/api/blog/detail') {
		const result = getDetail(res,id)
	}
	// 新建一篇博客
	if (method === "POST" && req.path === "/api/blog/new") {
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		})
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result);
			newBlog(res,resdata)
		})
	}
	// 更新一篇博客
	if (method === "POST" && req.path === "/api/blog/update") {
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		})
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result); 
			updataBlog(res,resdata)
		})
	}
	// 删除一篇博客
	if (method === "POST" && req.path === "/api/blog/del") {
		let tempResult = "";
		req.addListener("data", function(chunk) {
			tempResult += chunk;
		})
		// 数据接收完成
		req.addListener("end", function() {
			var result = JSON.stringify(qs.parse(tempResult));
			resdata = JSON.parse(result);  
			delBlog(res,resdata.id)
		})
	}
}

module.exports = handleBlogRouter
