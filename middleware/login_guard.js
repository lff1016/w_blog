const guard = (req, res, next) => {
    // 如果 url 不是 /login 以及没有 req.session.username ,说明并没有登录，重定向到登录界面
    if (req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 用户已经登录，可以访问路由
        next()
    }
}

module.exports = guard
