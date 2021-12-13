// 文章管理
// 引入 mongoose
const mongoose = require('mongoose')

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 2,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        // 关联用户信息数据库
        ref: 'User',
        required: [true, '请输入作者']
    },
    category:{
        type: String
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})
//  根据规则创建集合
const Article = mongoose.model('Article', articleSchema)
// 将集合作为模块成员进行导出
module.exports = {
    Article
}
