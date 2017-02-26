var express = require('express');
var router = express.Router();
var publishComment = require('../models/comment').publishComment;

router.post('/:id', function(req, res, next){
    publishComment({
        article : req.params.id,
        author : req.body.author,
        word : req.body.word
    }).then(function(){
        req.flash('message', '评论成功');
        res.redirect('back');
    }).catch(next);
})

module.exports = router;