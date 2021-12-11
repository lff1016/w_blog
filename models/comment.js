// 评论集合
const mongoose = require('mongoose')

// 创建集合规则
const commentSchema = new mongoose.Schema({
    // 文章的 id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户的 id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
})

// 创建集合
const Comment = mongoose.model('Comment', commentSchema)

// 导出
module.exports = {
    Comment
}
