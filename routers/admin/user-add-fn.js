// 这块就改成新增用户
// 验证用户信息提交 post 请求
const md5 = require('md5')
const { User, validUser } = require('../../models/user')

module.exports = async (req, res, next) => {
     try {
         // 异步验证表单内容
         // 验证通过
         // 用户信息输入验证抽离出去
        await validUser(req.body)
     } catch (err) {
         // 验证没有通过
         // 重定向到新增用户界面
         // 错误处理代码重复，所以要用到 express 的错误处理中间件进行同意处理
         // res.redirect(`/admin/user-edit?message=${err.message}`)
         // return 终止代码向下执行
         // next() 中传入的只一个字符串
         // 需要传入 {path: '/admin/user-edit', message: '错误信息'}
         return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
         // console.log(err.message)
     }
    console.log(req.body)
    // 根据邮箱查询用户是否存在
    let user = await User.findOne({email: req.body.email})
    if (user) {
        // 如果用户存在，显示错误信息，邮箱地址已被占用
        // res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
        return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱已经被占用'}))
    }

    // 如果用户不存在，就添加用户
    // 将密码进行加密
    req.body.password = md5(md5(req.body.password))
    // 将用户添加到数据库中
    await User.create(req.body)
    // 重定向到用户页面
    res.redirect('/admin/user')

}

