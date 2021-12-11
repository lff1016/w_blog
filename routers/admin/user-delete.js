// 删除用户路由
const { User } = require('../../models/user')
module.exports = async (req, res) => {
    // url 中获取 id 的值
    let id = req.query.id
    // 根据 id 进行删除用户操作
    await User.findOneAndDelete({_id: id})

    res.redirect('/admin/user')
}
