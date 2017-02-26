var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check');
var sha1 = require('sha1');
var getPassword = require('../models/admin').getPassword;
var publish = require('../models/article').publish;
var getAllArticle = require('../models/article').getAllArticle;
var updateArticle = require('../models/article').updateArticle;
var getArticleById = require('../models/article').getArticleById;
var removeArticle = require('../models/article').removeArticle;
var config = require('config-lite');
var marked = require('marked');

//跳转至管理员主界面
router.get('/', checkLogin, function(req, res){
    res.redirect(config.rootUrl + '/admin/articles');
})

//登录界面
router.get('/signin', function(req, res){
    res.render('signin');
})

//文章发布界面
router.get('/publish', checkLogin, function(req, res){
    res.render('publish');
})

//新文章添加至数据库
router.post('/publish', function(req, res, next){
    var category = req.body.category.split(' ');
    var title = req.body.title;
    var content = req.body.content;
    publish({
        category : category,
        title : title,
        content : content,
        pv : 0
    }).then(function(){
        req.flash('message', '发布成功');
        res.redirect(config.rootUrl + '/admin/articles');
    }).catch(next);
})

//后台主界面
router.get('/articles', checkLogin, function(req, res, next){
    getAllArticle().then(function(articles){
        articles.forEach(function(article){
            article.content = marked(article.content);
        })
        res.render('articles', {
            articles : articles
        })
    }).catch(next);
})
//更新一篇文章  origin
router.get('/articles/:id/update', checkLogin, function(req, res, next){
    getArticleById(req.params.id).then(function(article){
        article = article[0];
        article.category = article.category.join(' ');
        res.render('update',{
            article : article
        })
    }).catch(next);
})

router.post('/articles/:id/update', function(req, res, next){
    var category = req.body.category.split(' ');
    var title = req.body.title;
    var content = req.body.content;
    updateArticle(req.params.id, {
        category : category,
        title : title,
        content : content       
    }).then(function(){
        req.flash('message', '修改成功');
        res.redirect(config.rootUrl + '/admin/articles');
    }).catch(next);
})

//删除一篇文章
router.get('/articles/:id/delete', function(req, res, next){
    removeArticle(req.params.id).then(function(){
        req.flash('message', '删除成功');
        res.redirect(config.rootUrl + '/admin/articles');
    }).catch(next);
})
//验证是否是管理员
router.post('/signin', function(req, res, next){
    getPassword(req.body.username).then(function(password){
        if(sha1(req.body.password) === password[0].password){
            req.session.admin = true;
            res.redirect(config.rootUrl + '/admin/articles');
        }else{
            req.flash('message', '登陆失败');
            res.redirect('back');
        }
    }).catch(next);
})

module.exports = router;