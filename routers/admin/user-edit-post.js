// 修改用户信息
const { User, validUser } = require('../../models/user')
const formidable = require('formidable')
const path = require('path')
const md5 = require('blueimp-md5')
module.exports = (req, res, next) => {
    // 1. 创建文件表单解析对象，并且保留文件的后缀名
    const form = formidable({keepExtensions: true})
    // 2. 配置上传文件的保存位置（__dirname 定位到 admin）
    form.uploadDir = path.join(__dirname, '../','../', 'public', 'uploads')
    // 3. 解析表单
    form.parse(req, async (err, fields, files) => {
        const {username, email, password, role, state, bio} = fields
        // 根据 id 获取用户信息
        let id = req.query.id
        try {
            // 验证用户的信息
            await validUser(fields)
        } catch (err) {
            return next(JSON.stringify({path: '/admin/user-edit', message: err.message}))
        }
        // 比对密码，正确才能继续
        let user = await User.findOne({_id: id})
        let isPwTrue = md5(md5(password)) === user.password
        // 更新用户信息
        if (isPwTrue) {
            await User.findOneAndUpdate({_id: id}, {
                username,
                email,
                role,
                state,
                bio,
                avatar: files.filepath.split('public')[1]
            })
            res.redirect('/admin/user')
        }
    })
}
