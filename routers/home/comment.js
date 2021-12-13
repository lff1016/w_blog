// 导入评论构造集合
const { Comment } = require('../../models/comment')
module.exports = async (req, res) => {
    const { content, uid, aid } = req.body
    // 将评论信息存储到评论集合当中
    await Comment.create({
        content: content,
        aid: aid,
        uid: uid,
        time: new Date()
    })

    // 将文章重定向回文章详情页面
    res.redirect('/home/article?id=' + aid)
}
