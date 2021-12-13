// 后端配置文件
const express = require('express')
const path = require('path')
const template = require('art-template')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require('morgan')
const config = require('config')
const dateFormat = require('dateformat')

// 导入路由
const home = require('./routers/home')
const admin = require('./routers/admin')

//连接数据库
require('./models/connect')

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
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: `mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`
    })
}))

// 全局配置 dateFormat 修改时间格式
template.defaults.imports.dateFormat = dateFormat

// 11. 设置不同的环境变量
if (process.env.NODE_ENV === 'development') {
    console.log('当前是开发环境')
    // 打印请求
    app.use(morgan('dev'))
} else {
    console.log('当前是生产环境')
    app.use(morgan('dev'))
}

// 8.登录拦截
// 只有用户登录才能访问用户列表页面
// 第一个参数：匹配路由以 /admin 开头的
app.use('/admin', require('./middleware/login_guard'))

// 6. 配置路由请求路径
app.use('/home', home)
app.use('/admin', admin)


// 7. 监听端口
app.listen('3000', () => {
    console.log('服务器已经开启')
})
