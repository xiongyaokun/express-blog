var config = require('config-lite');
var mongoose = require('mongoose');
//连接
mongoose.connect(config.mongodb);

//admin
var adminSchema = new mongoose.Schema({
    name : String,
    password : String
})
module.exports.admin = mongoose.model('admin', adminSchema);

//文章
var articleSchema = new mongoose.Schema({
    category : [String],
    title : String,
    content : String,
    pv : Number
})
module.exports.article = mongoose.model('article', articleSchema);

//留言
var commentSchema = new mongoose.Schema({
    article : mongoose.Schema.Types.ObjectId,
    author : String,
    word : String
})
module.exports.comment = mongoose.model('comment', commentSchema);