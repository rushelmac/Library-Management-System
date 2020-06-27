const Users = require('../models/user');
const Admins = require('../models/admin');
// const passport = require('passport');
const bcrypt = require("bcrypt");

// const LocalStrategy = require('passport-local').Strategy;

// passport.use('User', new LocalStrategy(
//     (usernm, hash, done) => {
//         Users.findOne({userName : usernm} , (err,user) => {
//             if(err){
//                 return done(err);
//             }
//             else if(!user){
//                 return done(null, false, {message: "Invalid Username"})
//             }
//             else{
//                 bcrypt.compare(hash,user.password,(err,result)=>{
//                     if(result == true){
//                         return done(null,user);
//                     }
//                     else{
//                         return done(null,false,{message:"Incorrect password"});
//                     }
//                 })
//             }
//         });
//     }
// ));

// passport.serializeUser(function (user1, done) {
//     console.log("IN SERIALIZER")
//     const obj = {id:user1._id,username:user1.username,isAdmin:user1.isAdmin};
//     done(null,obj);
// });

// passport.deserializeUser(function(object, done) {
//     Users.find({username : object.user}, function(err, founduser) {
//         done(err, founduser);
//     });
// });

// passport.use('Admin', new LocalStrategy(
//     (usernm, hash, done) => {
//         Admins.findOne({username : usernm} , (err,user) => {
//             if(err){
//                 return done(err);
//             }
//             else if(!user){
//                 return done(null, false, {message: "Invalid Username"})
//             }
//             else{
//                 bcrypt.compare(hash,user.password,(err,result)=>{
//                     if(result == true){
//                         return done(null,user);
//                     }
//                     else{
//                         return done(null,false,{message:"Incorrect password"});
//                     }
//                 })
//             }
//         });
//     }
// ));

// passport.serializeUser(function (user1, done) {
//     const obj = {id:user1._id,user:user1.username,isAdmin:user1.isAdmin};
//     done(null,obj);
// });

// passport.deserializeUser(function(object, done) {
//     Admins.find({username : object.user}, function(err, user1) {
//         done(err, user1);
//     });
// });

// module.exports.userAuth = passport.authenticate("User");
// module.exports.adminAuth = passport.authenticate("Admin");

// check if logged user is admin before performing some operations
var verifyAdmin = (req,res,next) => {
    if(req.session && req.session.isAdmin){
        next();
    }
    else{
        var err = new Error("You should be Admin to perform this operation!..");
        err.status = 403;
        return next(err);
    }
}

// check if logged user is user before performing some operations
var verifyUser = (req,res,next) => {
    if(req.session && !req.session.isAdmin){
        next();
    }
    else{
        var err = new Error("You should be User to perform this operation!..");
        err.status = 403;
        return next(err);
    }
}

module.exports = {
    verifyAdmin,
    verifyUser
};
