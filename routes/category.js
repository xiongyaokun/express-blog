var express = require('express');
var router = express.Router();
var marked = require('marked');
var getArticlesByCategory = require('../models/article').getArticlesByCategory;
var getComment = require('../models/comment').getComment;

router.get('/:category', function(req, res, next){
    getArticlesByCategory(req.params.category).then(function(articles){
        var allCategory = [];
        var taskList = [];
        articles.forEach(function(article){
            taskList.push(getComment(article._id));
            article.content = marked(article.content);
        })

        Promise.all(taskList).then(function(result){
            articles.forEach(function(article, index){
                article.wordsNum = result[index].length;
            })
            
            res.render('category', {
                articles : articles,
                category : req.params.category
            })
        })
    }).catch(next);
})

module.exports = router;