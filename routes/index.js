var express= require('express');
var router = express.Router();
var controller = require('../controllers/controller');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;


var User = require('../models/user');


router.get('/', controller.index);

router.get('/post', controller.post_get);

router.post('/post', controller.post_post);

router.get('/post/:id', controller.onepost_get);

router.post('/post/:id', controller.onepost_post);

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        username=req.body.username;
        
        confirmpassword=req.body.confirmpassword;

        process.nextTick(function() {
            if(password != confirmpassword) {
                return done(null, false, req.flash('signupMessage', 'Passwords do not match.'));
            }

        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                var newUser = new User();
                newUser.username = username;
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
           
                newUser.save(function(err) {
                    if (err){
                        console.log(err);
                    }
                       
                    return done(null, newUser);
                });
            }

        });    

        });

    }));




passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) { 
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); 

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });

    }));


router.get('/login', function(req,res){
    res.render('login.pug', { message: req.flash('loginMessage') }); 
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', 
    failureRedirect : '/login',
    failureFlash : true 
}));


router.get('/signup', function(req,res){
    res.render('signup.pug', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', 
    failureRedirect : '/signup', 
    failureFlash : true 
}));


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports=router;
