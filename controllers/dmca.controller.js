const Dmca = require('../models/dmca.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the dmca Test controller!');
};

exports.create_dmca = function (req, res, next) {
    let dmca = new Dmca(
        {
            copyright: req.body.copyright,
            name: req.body.name,
            email: req.body.email,
            violation: req.body.violation,
            complaint: req.body.complaint,
            resolved: req.body.resolved,
            notice: req.body.notice
        }
    );

    dmca.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    res.send (dmca);
}; 

exports.find_all = function (req, res, next) {
    Dmca.find({}, function (err, results){
       res.send(results);
    });
};

exports.resolve = function (req, res, next) {
    Dmca.findByIdAndUpdate(req.params.id, {$set: {resolved: true}}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.notice = function (req, res, next) {
    Dmca.findByIdAndUpdate(req.params.id, {$set: {notice: true}}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};