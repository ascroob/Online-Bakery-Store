const Privacy = require('../models/privacy.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the privacy Test controller!');
};

exports.create_section = function (req, res, next) {
    let privacy = new Privacy(
        {
            section: req.body.section,
            text: req.body.text   
        }
    );

    privacy.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    res.send (privacy);
}; 

exports.find_all = function (req, res, next) {
    Privacy.find({}, function (err, results){
       res.send(results);
    });
};

exports.edit_section = function (req, res, next) {
    Privacy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, results){
       res.send(results);
    });
};