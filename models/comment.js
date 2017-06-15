var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	'data' : {type:String, required:[true,"{PATH} is required"], trim:true},
	'post'  : {type:mongoose.Schema.Types.ObjectId, ref:'Post'},
	'user'  : {type:mongoose.Schema.Types.ObjectId, ref:'User'} 

});


module.exports = mongoose.model('Comment', commentSchema);

