const express = require('express')

// 借用 express 开启路由
const admin = express.Router()

// 用户列表页面
admin.get('/user', require('./admin/user-page'))

// /admin/login 登录界面
admin.get('/login', (req, res) => {
    res.render('./admin/login.art')
})

admin.post('/login', require('./admin/login_post'))

// /admin/user-edit 新增用户/用户编辑
admin.get('/user-edit',  require('./admin/user-edit'))

admin.post('/user-edit', require('./admin/user-edit-post'))

admin.post('/user-add', require('./admin/user-add-fn'))

// 注册普通用户
admin.get('/register', require('./admin/register'))

admin.post('/register', require('./admin/register-post'))

// 退出登录
admin.get('/logout', (req, res) => {
    // 将 session 清除
    req.session.username = null
    // 将用户信息挂载到 app.locals 中，可以全局访问到用户信息
    req.app.locals.userInfo = null
    // 跳转到登录界面
    res.redirect('/admin/login')
})

// 删除用户
admin.get('/delete', require('./admin/user-delete'))

// 文章列表页面
admin.get('/article', require('./admin/article'))

// 文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'))

// 添加文章
admin.post('/article-add', require('./admin/article-add'))

// 修改文章
admin.post('/article-edit')



// 导出路由
module.exports = admin
