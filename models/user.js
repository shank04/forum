var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
		username     : {type:String, required:[true,"{PATH} is required"],trim:true},
		email        : {type:String, required:[true,"{PATH} is required"],trim:true},
        password     : {type:String, required:[true,"{PATH} is required"],trim:true},
        confirmpassword     : {type:String},

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

