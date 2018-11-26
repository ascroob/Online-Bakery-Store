const Product = require('../models/product.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res, next) {
    console.log('post');
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    
    res.send ('Product successfully created.')
}; //create new product using the data coming from a POST request and save to database.

exports.product_details = function (req, res, next) {
    console.log('get');
    Product.findById(req.params.id, function (err, product) {
        res.send(product);
    });
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(product);
    });
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};