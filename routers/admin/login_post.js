const { User } = require("../../models/user");
const md5 = require("blueimp-md5");

const login_post = async (req, res) => {
    // 获取表单内容
    const { email, password } = req.body
    // 判断用户的输入是否为空
    if (email.trim().length === 0 || password.trim().length === 0) {
        return res.status(400).render('./admin/error.art', {msg: '邮件或密码错误'})
    }
    // 判断用户之前是否存在
    let user = await User.findOne({ email: email})
    if (user) {
        let isValid = md5(md5(password)) === user.password
        //进行密码比对
        if (isValid) {
            // 如果用户存在登录成功
            // 将用户存在 session 中
            req.session.username = user.username
            // 将用户信息挂载到 app.locals 中，可以全局访问到用户信息
            req.app.locals.userInfo = user
            // 对用户的角色进行判断
            if (user.role === 'admin') {
                // 重定向到用户列表页
                res.redirect('/admin/user')
            } else {
                // 重定向到文章列表页面
                res.redirect('/home/')
            }

        } else {
            return res.status(400).render('./admin/error.art', {msg: '邮件或密码错误'})
        }
    } else {
        return res.status(400).render('./admin/error.art', {msg: '用户不存在'})
    }
}

module.exports = login_post
