const mongoose = require('mongoose')
const Joi = require('joi')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        //保证唯一
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['normal', 'admin']
    },
    state: {
        type: Number,
        enum: [0, 1],
        //默认为 0 为启用，1 为禁用
        default: 0
    },
    // 头像
    avatar: {
        type: String,
        default:  '/pubilc/img/avatar-default.png'
    },
    // 博客描述
    bio: {
        type: String,
        default: '',
        maxlength: 100
    }
})

const User = mongoose.model('User', UserSchema)

// 将用户信息验证抽离出来
const validUser = user => {
    // 定义规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合要求')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,16}$')).required().error(new Error('密码不符合要求')),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required().error(new Error('邮箱不符合要求')),
        // valid() 中直接传入允许输入的值，而不是数组
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态非法')),
        avatar: Joi.string().error(new Error('头像上传错误')),
        bio: Joi.string().error(new Error('描述字数不能超过100字')),
    })
    return schema.validateAsync(user)
}

module.exports = {
    User,
    validUser
}

