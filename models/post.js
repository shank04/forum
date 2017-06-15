var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	'title' : {type:String, required:[true,"{PATH} is required"], trim:true},
	'description' : {type:String, required:[true,"{PATH} is required"], trim:true},
	'link' : {type:String,required:[true,"{PATH} is required"],trim:true},
	'user'  : {type:mongoose.Schema.Types.ObjectId, ref:'User'} 

});

postSchema.virtual('url').get(function(){
	return '/post/'+this._id;
});

module.exports = mongoose.model('Post', postSchema);

