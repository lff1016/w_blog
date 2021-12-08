const express = require('express')

// 借用 express 开启路由
const admin = express.Router()

admin.get('/', (req, res) => {
    res.send('ok')
})


// 导出路由
module.exports = admin
