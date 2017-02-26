var Article = require('../lib/mongo').article;

module.exports = {
    //发布一篇文章
    publish : function(article){
        return Article
            .create(article); 
    },
    //获取所有的文章
    getAllArticle : function(){
        return Article
            .find()
            .exec();
    },
    //获得一篇文章
    getArticleById : function(id){
        return Article
            .find({_id:id})
            .exec();
    },
    //更新文章
    updateArticle : function(id, newArticle){
        return Article
            .update(
                {_id : id},
                newArticle
            );
    },
    //删除一篇文章
    removeArticle : function(id){
        return Article
            .remove({_id : id})
            .exec();
    },
    //根据category取文章
    getArticlesByCategory : function(category){
        return Article
            .find({ category : category })
            .exec();
    },
    //incPv
    incPv : function(id){
        return Article
            .update({ _id : id}, { $inc : { pv : 1 } })
            .exec();
    }
}