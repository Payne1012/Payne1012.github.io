const mysql = require('mysql')
const {
	MYSQL_CONF
} = require('../config/db')

var formidable = require('formidable'); 

var path = require("path");

var fs = require("fs");

const con = mysql.createConnection(MYSQL_CONF)
// 开始连接
con.connect()

const getList = (res, author = '', keyword = '') => {
	let readSql = `select * from blogs where 1=1 `
	if (author) {
		readSql += `and author='${author}' `
	}
	if (keyword) {
		readSql += `and title like '%${keyword}%' `
	}

	readSql += `order by createtime desc`

	con.query(readSql, (err, result) => {
		if (err) {
			res.write(JSON.stringify({
				code: "100",
				message: "失败",
				data: err
			}));
			res.end();
		} else {
			res.write(JSON.stringify({
				code: "200",
				message: "成功",
				data: result
			}));
			res.end();
		}
	});
}

const getDetail = (res, id) => {
	// 返回假数据
	const readSql = `select * from blogs where id = ${id}`
	con.query(readSql, (err, result) => {
		if (err) {
			res.write(JSON.stringify({
				code: "100",
				message: "失败",
				data: err
			}));
			res.end();
		} else {
			res.write(JSON.stringify({
				code: "200",
				message: "成功",
				data: result
			}));
			res.end();
		}
	});
}

const newBlog = (res, blogData = {}) => {
	// blogData 是一个博客对象，包含title、 content 、category、author、createtime属性
	const title = blogData.title
	const content = blogData.content
	const author = blogData.author
	const category = blogData.category
	const createtime = blogData.createtime
	const imgurl = blogData.imgurl
	const readSql =
		`insert into blogs (title,imgurl,content,category,createtime,author) values('${title}','${imgurl}','${content}','${category}','${createtime}','${author}')`
	con.query(readSql, (err, result) => {
		if (err) {
			res.write(JSON.stringify({
				code: "100",
				message: "失败",
				data: err
			}));
			res.end();
		} else {
			res.write(JSON.stringify({
				code: "200",
				message: "成功"
			}));
			res.end();
		}
	});
}

const updataBlog = (res, blogData = {}) => {
	// id 要更新博客的id
	// blogdata 是一个博客对象，包含title content属性 
	const id = blogData.id
	const title = blogData.title
	const content = blogData.content
	const category = blogData.category
	const createtime = blogData.createtime
	const author = blogData.author
	const imgurl = blogData.imgurl
	const readSql =
		`update blogs set title = '${title}' ,imgurl = '${imgurl}', content = '${content}',category = '${category}' , createtime = '${createtime}', author = '${author}' where id = ${id}`
	con.query(readSql, (err, result) => {
		if (err) {
			res.write(JSON.stringify({
				code: "100",
				message: "失败",
				data: err
			}));
			res.end();
		} else {
			res.write(JSON.stringify({
				code: "200",
				message: "成功"
			}));
			res.end();
		}
	});
}

const delBlog = (res, id) => {
	// id 是删除博客的id
	const readSql = `delete from blogs where id = ${id}`

	con.query(readSql, (err, result) => {
		if (err) {
			res.write(JSON.stringify({
				code: "100",
				message: "失败",
				data: err
			}));
			res.end();
		} else {
			res.write(JSON.stringify({
				code: "200",
				message: "成功"
			}));
			res.end();
		}
	});
}

const upload = (req, res) => {
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8';
	form.uploadDir = path.join("/teacher/upload");
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;
	//处理图片 
	console.log(form.uploadDir)
	form.parse(req, function(err, fields, files) { 
		var filename = files.file.name 
		var nameArray = filename.split('.');
		var type = nameArray[nameArray.length - 1];
		var name = '';
		for (var i = 0; i < nameArray.length - 1; i++) {
			name = name + nameArray[i];
		}
		var date = new Date();
		var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" +
			date.getMinutes();
		var avatarName = name + time + '.' + type;
		var newPath = form.uploadDir + "/" + avatarName;
		fs.renameSync(files.file.path, newPath); //重命名
		res.write(JSON.stringify({
			code: "200",
			message: "成功",
			data: "/upload/" + avatarName
		}));
		res.end();
	})
	
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updataBlog,
	delBlog,
	upload
}
