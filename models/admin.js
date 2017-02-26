var Admin = require('../lib/mongo').admin;

module.exports = {
    getPassword : function(admin){
        return Admin
            .find({ admin : admin})
            .select({password:1, _id:0})
            .exec(); 
    }
}