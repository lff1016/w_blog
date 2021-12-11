const express = require('express')

// 借用 express 开启路由
const home = express.Router()

home.get('/home', (req, res) => {
    res.render('./home/home.art')
})

home.get('/article', (req, res) => {
    res.render('./home/article.art')
})

// 导出路由
module.exports = home
