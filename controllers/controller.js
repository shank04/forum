var passport = require('passport');
var async = require('async');
var Post = require('../models/post');
var Comment = require('../models/comment');


exports.index = function(req, res){
	if(req.isAuthenticated()){
		user = req.user;
		Post
		.find()
		.populate('user')
		.exec(function (err, posts) {
  		if (err) throw err;
			res.render("unindex.pug", {user:user, posts : posts});
  	});
				
	}
	else{
		res.render("index.pug");
	}
};

exports.post_get = function(req, res){
	if(req.isAuthenticated()){
		user=req.user;

		res.render('post', {user:user});
	}
	else{
		res.send("You need to be logged in to view this");
	}
};

exports.post_post = function(req, res){
	user=req.user;

	var post = new Post({
		title : req.body.title,
		description : req.body.description,
		link : req.body.link,
		user : user._id

	});

	post.save(function(err){
		if(err){
			console.log(err);
			res.render('post', {error : err, post : post, user : user});
		}
		else{
			console.log('New post added');
			res.redirect('/');
		}
	});
	
};

exports.onepost_get = function(req, res){
	id = req.params.id;
	if(req.isAuthenticated()){
		user = req.user;
		Post
		.findById(id)
		.populate('user')
		.exec(function (err, post) {
  		if (err) throw err;
			Comment
			.find({'post' : id})
			.populate('user')
			.exec(function(errr, comments){
				if(errr) throw errr;
			res.render('post_detail.pug', {post : post, user : user, comments:comments});

			});
			
  		});
					
	}
	else{
		res.send("You need to be logged in to view this");
	}
};

exports.onepost_post = function(req, res){
	user=req.user;

	var comment = new Comment({
		
		data : req.body.data,
		post : req.params.id,
		user : user._id

	});

	comment.save(function(err){
		if(err){
			console.log(err);
			res.render('post_detail.pug', {error : err, comment : comment, user : user});
		}
		else{
			console.log('New comment added');
			res.redirect(req.get('referer'));
		}
	});
	
};


