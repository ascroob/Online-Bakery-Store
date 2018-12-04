const Product = require('../models/product.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//Retrieve and return all notes from the database.
exports.product_findAll = function (req, res, next) {

    Product.find({ quantity: { $gt: 0 } }, function (err, results){
       console.log(results); 
       res.send(results);
        if (err) {
            console.log(err);
            return next(err);
        }
    }).sort({purchased: -1}); //order items in descending order based on the # purchased
};

exports.product_create = function (req, res, next) {
    console.log('post');
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price, 
            descrip: req.body.descrip,
            quantity: req.body.quantity,
            purchased: req.body.purchased
            
        }
    );

    product.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    
    res.send (product);
}; //create new product using the data coming from a POST request and save to database.

exports.product_details = function (req, res, next) {
    console.log('get');
    Product.findById(req.params.id, function (err, product) {
        
        res.send(product);
    });
};

exports.product_amount = function (req, res, next){
    Product.findById(req.params.id, function (err, results){
        res.send(results);
        if (err) {
            console.log(err);
            return next(err);
        }
    }).select("quantity");
}

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(product);
    });
};
/*
exports.product_update_rating = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$push: {rating: req.body.rating}}, {$set: req.body}, function (err, product) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(product);
    });
};
*/
exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};