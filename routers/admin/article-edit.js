module.exports = (req, res) => {
    // 添加标识，用于确认侧边栏文章管理标签被选中
    req.app.locals.currentLink = 'article'
    res.render('admin/article-edit.art')
}
