const mongoose = require('mongoose')
const config = require('config')
//
// mongoose.connect('mongodb://wblog:960207@162.14.76.95:27017/w_blog')
//     .then(() => console.log('数据库连接成功'))
//     .catch(err => console.log(err))
//
// mongoose.connect('mongodb://lf:456@localhost:27017/w_blog')
//     .then(() => console.log('数据库连接成功'))
//     .catch(err => console.log(err))

mongoose.connect(`mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,)
    .then(() =>console.log('数据库连接成功'))
    .catch((err) => console.log(err))
