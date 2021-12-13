// 博客首页内容
const { User } = require('../../models/user')
const { Article } = require('../../models/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    // 查询 admin 的信息
    let page = req.query.page
    // 将 admin 信息挂载到全局
    req.app.locals.admin = await User.findOne({role: 'admin'})

    let article = await pagination(Article).find().page(page).size(5).display(5).populate('author').exec()
    let str = JSON.stringify(article)
    let adminArticle = JSON.parse(str)
    // 将分类单独拆出来
    let categories = []
    adminArticle.records.forEach(item => {
        categories.push(item.category)
    })
    // 数组去重
    categories = Array.from(new Set(categories))
    adminArticle.categories = categories
    req.app.locals.adminArticle = adminArticle
    // res.send(adminArticle)
    res.render('./home/default.art', {
        adminArticle
    })
}
