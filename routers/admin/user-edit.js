// user-edit get请求
// 用户修改操作
const { User } = require('../../models/user')
module.exports = async (req, res) => {
    // 添加标识，用于确认侧边栏用户管理标签被选中
    req.app.locals.currentLink = 'user'
    // 从 url 中获取错误信息
    const { message, id } = req.query
    // 如果 url 中有用户 id 的参数，说明就是要修改用户信息
    if (id) {
        // 修改操作
        let user = await User.findOne({_id: id})
        res.render('./admin/user-edit.art', {
            message,
            user,
            link: `/admin/user-edit?id=${id}`,
            button: '修改'
        })
    } else {
        res.render('./admin/user-edit.art', {
            message,
            link: '/admin/user-add',
            button: '添加'
        })
    }


}
