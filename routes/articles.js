var express = require('express');
var router = express.Router();
var config = require('config-lite');
var getAllArticle = require('../models/article').getAllArticle;
var getComment = require('../models/comment').getComment;
var marked = require('marked');

router.get('/', function(req, res, next){
    getAllArticle().then(function(articles){
        var allCategory = [];
        var taskList = [];
        articles.forEach(function(article){
            taskList.push(getComment(article._id));
            article.content = marked(article.content);
            article.category.forEach(function(item){
                if(allCategory.indexOf(item) === -1 && item !== ''){
                    allCategory.push(item);
                }
            })
        })

        Promise.all(taskList).then(function(result){
            articles.forEach(function(article, index){
                article.wordsNum = result[index].length;
            })
            
            res.render('mainpage', {
                articles : articles,
                category : allCategory
            })
        })
    }).catch(next);
})

module.exports = router;