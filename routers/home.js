const express = require('express')

// 借用 express 开启路由
const home = express.Router()

home.get('/', require('./home/index'))

home.get('/article', require('./home/article'))

// 评论
home.post('/comment', require('./home/comment'))

// 导出路由
module.exports = home
