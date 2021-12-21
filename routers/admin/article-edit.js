// 渲染文章编辑界面
const { Article } = require('../../models/article')

module.exports = async (req, res) => {
    // 添加标识，用于确认侧边栏文章管理标签被选中
    req.app.locals.currentLink = 'article'
    // 获取文章 id
    let id = req.query.id

    // res.send(article)
    if (id) {
        let article = await Article.findOne({_id: id}).populate('author').lean()
        res.render('admin/article-edit.art', {
            article,
            link: `/admin/article-edit?id=${id}`,
            button: '修改'
        })
    } else {
        res.render('admin/article-edit.art', {
            link: '/admin/article-add',
            button: '添加'
        })
    }

}
