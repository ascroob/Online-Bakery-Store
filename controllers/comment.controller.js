const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the comment Test controller!');
};

exports.comment_create = function (req, res, next) {
    let comment = new Comment(
        {
            productID: req.body.productID,
            username: req.body.username,
            comment: req.body.comment,
            hidden: req.body.hidden,
            rating: req.body.rating
        }
    );

    comment.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    
    res.send (comment);
    res.send ('Comment successfully created.');

}; //create new user using the data coming from a POST request and save to database.

//Retrieve and return all notes from the database.
exports.comment_findAll = function (req, res, next) {
    Comment.find({}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.comment_findItem = function (req, res, next) {
    Comment.find({}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.comment_hide = function (req, res, next) {
    Comment.findByIdAndUpdate(req.params.id, {$set: {hidden: true}}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.comment_restore = function (req, res, next) {
    Comment.findByIdAndUpdate(req.params.id, {$set: {hidden: false}}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};