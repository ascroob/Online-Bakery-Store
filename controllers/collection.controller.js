const Collection = require('../models/collection.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the collection Test controller!');
};

exports.collection_create = function (req, res, next) {
    let collection = new Collection(
        {
            username: req.body.username,
            name: req.body.name,
            prodName: req.body.prodName,
            descrip: req.body.descrip,
            privacy: req.body.privacy
        }
    );

    collection.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    res.send(collection);

};

exports.collection_findAll = function (req, res, next) {
    Collection.find({}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.collection_findItem = function (req, res, next) {
    Collection.find({ username: req.body.username}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.collection_amount = function (req, res, next) {
    console.log(req.body);
    Collection.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, collection) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(collection);
    });
};

exports.collection_delete = function (req, res, next) {
    Collection.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
    })
};

exports.collection_delete_product = function (req, res, next) {
    Collection.findByIdAndUpdate(req.params.id, {$pull: {prodName: req.body.prodName}}, function (err, collection) {
        if (err) return next(err);
        res.send(collection);
    })
};

exports.collection_add_product = function (req, res, next){
  Collection.findByIdAndUpdate(req.params.id, {$push: {prodName: req.body.prodName}}, function (err, collection){
      if (err)return next (err);
      res.send(collection);
  }) ; 
};