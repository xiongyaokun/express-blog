var express = require('express');
var router = express.Router();
var config = require('config-lite');
var marked = require('marked');
var getArticleById = require('../models/article').getArticleById;
var incPv = require('../models/article').incPv;
var getComment = require('../models/comment').getComment;

router.get('/:id', function(req, res, next){
    Promise.all([
        getArticleById(req.params.id),
        getComment(req.params.id),
        incPv(req.params.id)
    ])
    .then(function(result){
        var article = result[0][0];
        article.content = marked(article.content);
        var words = result[1];
        res.render('articledetail',{
            article : article,
            words : words
        })
    }).catch(next);
})

module.exports = router;