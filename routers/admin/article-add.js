// 文章添加
// 引入 formidable 模块
const formidable = require('formidable')
const path = require('path')

const { Article } = require('../../models/article')
module.exports = (req, res) => {
    // 1. 创建表单解析对象
    // 3. 保留上传文件的后缀（默认 false）
    const form = formidable({ keepExtensions: true })
    // 2. 配置上传文件的存储位置(__dirname 定位到 admin)
    form.uploadDir = path.join(__dirname, '../','../', 'public', 'uploads')
    // 4. 解析表单
    // err：错误对象，表单解析失败，存储错误信息
    // fields: 对象形式，保存了除了二进制数据以外的数据（普通请求参数）
    // files：存储上传的文件信息
    form.parse(req, async (err, fields, files) => {
        // 截取保存在服务器中的图片路径：files.cover.filepath.split('public')[1]
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishData: fields.publishData,
            cover: files.cover.filepath.split('public')[1],
            content: fields.content,
            category: fields.category
        })
        // 重定向到文章列表页面
        res.redirect('/admin/article')
    })
    // res.send('添加文章')
}
