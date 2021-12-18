// 这块就改成新增用户
// 验证用户信息提交 post 请求
const md5 = require('blueimp-md5')
const formidable = require('formidable')
const path = require('path')
const { User, validUser } = require('../../models/user')

module.exports = (req, res, next) => {
    // 1. 创建文件表单解析对象，并且保留文件的后缀名
    const form = formidable({keepExtensions: true})
    // 2. 配置上传文件的保存位置（__dirname 定位到 admin）
    form.uploadDir = path.join(__dirname, '../','../', 'public', 'uploads')
    // 3. 解析表单
    form.parse(req, async (err, fields, files) => {
        const { username, email, password, role, state, bio} = fields
        try {
            // 验证用户的信息
            await validUser(fields)
        } catch (err) {
            return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
        }
        // 根据邮箱查询用户是否存在
        let user = await User.findOne({email: email})
        console.log(user)
        if (user) {
            // 如果用户存在
            return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱已经被占用'}))
        }
        // 如果用户不存在就添加用户
        await User.create({
            username: username,
            email: email,
            password: md5(md5(password)),
            role: role,
            state: state,
            avatar: files.avatar.filepath.split('public')[1],
            bio: bio
        })
    })
    // 重定向到用户页面
    res.redirect('/admin/user')

}

