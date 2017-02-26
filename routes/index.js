module.exports = function(app){
    app.get('/', function(req, res){
        res.redirect('/articles');
    })
    app.use('/admin', require('./admin'));
    app.use('/articles', require('./articles'));
    app.use('/category', require('./category'));
    app.use('/article', require('./article'));
    app.use('/comment', require('./comment'));
    app.get('/aboutme', function(req, res){
        res.render('aboutme');
    })
}