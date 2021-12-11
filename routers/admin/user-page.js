// 用户列表页面渲染
const { User } = require('../../models/user')

module.exports = async (req, res) => {
    // 添加标识，用于确认侧边栏用户管理标签被选中
    req.app.locals.currentLink = 'user'
    // 实现用户列表分页
    // 接收用户传进来的页数
    let page = req.query.page || 1
    // 定义一页要显示多少条数据
    let pageSize = 10
    // 获取用户信息总数
    let total = await User.countDocuments({})
    // 一共有多少页
    let pageCount = Math.ceil(total/pageSize)

    // 从数据库中查询所有的用户信息
    // 页面开始的位置
    let start = (page - 1) * pageSize
    let users = await User.find().limit(pageSize).skip(start)

    res.render('./admin/user.art', {
        users,
        page,
        pageCount
    })
}
