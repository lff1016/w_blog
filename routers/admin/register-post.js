const { User, validUser } = require('../../models/user')
const md5 = require("blueimp-md5");

module.exports = async (req, res, next) => {
    let body = req.body
    body.role = 'normal'
    body.state = 0
    try {
        // 验证用户的信息
        await validUser(body)
    } catch (err) {
        return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
    }
    // 根据邮箱查询用户是否存在
    let user = await User.findOne({email: body.email})
    if (user) {
        // 如果用户存在
        return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱已经被占用'}))
    }
    // 如果用户不存在就添加用户
    let newUser = await User.create({
        username: body.username,
        email: body.email,
        password: md5(md5(body.password)),
        role: body.role,
        state: body.state,
    })
    // 将用户存在 session 中
    req.session.username = newUser.username
    // 将用户信息挂载到 app.locals 中，可以全局访问到用户信息
    req.app.locals.userInfo = newUser
    // 重定向到用户页面
    res.redirect('/home')
}
