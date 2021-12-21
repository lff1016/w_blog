// 修改文章
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../models/article')

module.exports = (req, res) => {
    // 添加标识，用于确认侧边栏文章管理标签被选中
    req.app.locals.currentLink = 'article'

    // 1. 创建文件表单解析对象，并且保留文件的后缀名
    const form = formidable({keepExtensions: true})
    // 2. 配置上传文件的保存位置（__dirname 定位到 admin）
    form.uploadDir = path.join(__dirname, '../','../', 'public', 'uploads')
    // 3. 解析表单
    form.parse(req, async (err, fields, files) => {
        // 获取文章的 id
        let id = req.query.id
        // 在数据库中查找并更新这篇文章
        // 解析 post 参数
        const { title, category, publishDate, content } = fields

        let article = await Article.findOneAndUpdate({_id: id}, {
            title,
            category,
            publishDate,
            content,
            cover: files.cover.filepath.split('public')[1]
        })

        // res.render('admin/article-edit.art', {
        //     article
        // })
        res.redirect('/admin/article')
    })
}
