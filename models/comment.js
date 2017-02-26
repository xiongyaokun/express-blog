var Comment = require('../lib/mongo').comment;

module.exports = {
    //评论添加至数据库
    publishComment : function(content){
        return Comment
            .create(content); 
    },
    //根据文章_id得到评论
    getComment : function(id){
        return Comment
            .find({ article : id })
            .select({ author:1, word:1})
            .exec();
    }
}