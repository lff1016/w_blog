// 修改用户信息
const { User, validUser } = require('../../models/user')
const md5 = require('md5')
module.exports = async (req, res, next) => {
    // 根据 id 来获取要修改的用户
    let id = req.query.id
    let { username, email, password, role, state } = req.body
    try {
        await validUser(req.body)
    } catch (err) {
        return next(JSON.stringify({path: 'admin/user-edit', message: err.message}))
    }
    // 比对密码，正确才能继续执行，否则报错
    let user = await User.findOne({_id: id})
    let isPwTrue = md5(md5(password)) === user.password
    // 更新用户信息
    if (isPwTrue) {
        await User.findOneAndUpdate({_id: id}, {
            username,
            email,
            role,
            state
        })
        res.redirect('/admin/user')
    }
}
