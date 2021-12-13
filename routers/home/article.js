const { Article } = require('../../models/article')
const { Comment } = require('../../models/comment')

module.exports = async (req, res) => {
    // 获取文章的 id
    let id = req.query.id
    // 根据 id 查询文章
    let article = await Article.findOne({_id: id})

    // 根据 id 查询评论
    let comments = await Comment.find({aid: id}).populate('uid').lean()

    res.render('./home/article.art', {
        article,
        comments
    })
}
