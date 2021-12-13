// 渲染文章编辑界面
const { Article } = require('../../models/article')

module.exports = async (req, res) => {
    // 添加标识，用于确认侧边栏文章管理标签被选中
    req.app.locals.currentLink = 'article'
    let id = req.query.id
    let article = await Article.findOne({_id: id}).populate('author').lean()
    // res.send(article)
    res.render('admin/article-edit.art', {
        article
    })
}
