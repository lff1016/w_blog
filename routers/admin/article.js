// 获取文章列表
const { Article } = require('../../models/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    // 添加标识，用于确认侧边栏文章管理标签被选中
    req.app.locals.currentLink = 'article'
    let page = req.query.page
    // page 当前页数
    // size 每页显示多少条数据
    // display 指定客户端要显示的页码数量
    // exec() 发送请求
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec()
    let str = JSON.stringify(articles)
    let articlesJson = JSON.parse(str)
    // res.send(articlesJson)
    res.render('admin/article.art', {
        articlesJson
    })
}
