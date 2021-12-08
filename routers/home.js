const express = require('express')

// 借用 express 开启路由
const home = express.Router()

home.get('/', (req, res) => {
    res.render('./index.art')
})

// 导出路由
module.exports = home
