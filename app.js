// 后端配置文件
const express = require('express')
const path = require('path')
const template = require('art-template')
const bodyParser = require('body-parser')
const session = require('express-session')

// 导入路由
const home = require('./routers/home')
const admin = require('./routers/admin')

// 1. 开启服务器
const app = express()


// 2. 开放静态文件
app.use(express.static(path.join(__dirname, 'public')))

// 3. 配置模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))


// 4. 配置解析 post body 请求
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 5. 配置 session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

// 6. 配置路由请求路径
app.use('/home', home)
app.use('/admin', admin)


// 7. 监听端口
app.listen('3000', () => {
    console.log('服务器已经开启')
})
