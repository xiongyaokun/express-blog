var express = require('express');
var config = require('config-lite');
var pkg = require('./package.json');
var route = require('./routes/index');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var app = express();
//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//模板引擎
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

//session中间件
app.use(session({
    name : config.session.key,
    secret : config.session.secret,
    cookie : {
        maxAge : config.session.maxAge
    },
    store : new MongoStore({
        url : config.mongodb
    })
}))

//flash 中间件
app.use(flash());

//模板全局变量
app.locals.blog = {
    title : pkg.name,
    description : pkg.description
}

app.locals.rootUrl = config.rootUrl;

app.use(function(req, res, next){
    res.locals.admin = req.session.admin;
    res.locals.message = req.flash('message').toString();
    next();
})

//获得post数据
app.use(bodyParser.urlencoded({extender: false}));

//路由
route(app);

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send('something error');
})

app.listen(config.port, function(){
    console.log(pkg.name + ' listening...');
})