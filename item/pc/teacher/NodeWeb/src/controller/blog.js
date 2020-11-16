const { exec } = require('../db/mysql')
const { get } = require('../db/redis')

const getSession = (sessionId) => {
    return get(sessionId).then(session => {
        return JSON.parse(session) || {}
    })
}
// 这里where 1 = 1 是一个取巧的操作，这个操作既不会影响我们获取的数据，同时也可以简单了我们后面拼接其他条件，不然的话还需要在今天是否要加where的判断
const getList = (author = '', keyword = '') => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    // 返回一个promise
    return exec(sql)
}

const getDetail = (id) => {
    // 返回假数据
    const sql = `select * from blogs where id = ${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title、 content 、author、createtime属性
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = blogData.author
    const sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}',${createtime},'${author}')`
    return exec(sql).then(insertData => {
        return { id: insertData.insertId }
    })
}

const updataBlog = (id, blogData = {}) => {
    // id 要更新博客的id
    // blogdata 是一个博客对象，包含title content属性
    const title = blogData.title
    const content = blogData.content
    const sql = `update blogs set title = '${title}' , content = '${content}' where id = ${id}`
    return exec(sql).then(updateData => {
        // console.log(updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 是删除博客的id
    const sql = `delete from blogs where id = ${id} and author = '${author}'`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog,
    getSession
}