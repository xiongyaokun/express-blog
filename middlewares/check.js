var config = require('config-lite');

module.exports = function(req, res, next){
    if(!req.session.admin){
        res.redirect(config.rootUrl + '/admin/signin');
    }
    next();
}