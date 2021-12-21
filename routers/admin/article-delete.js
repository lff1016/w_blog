// 删除用户路由
const { Article } = require('../../models/article')
module.exports = async (req, res) => {
    // url 中获取文章 id 的值
    let id = req.query.id
    // 根据 id 进行删除用户操作
    await Article.findOneAndDelete({_id: id})

    res.redirect('/admin/article')
}
