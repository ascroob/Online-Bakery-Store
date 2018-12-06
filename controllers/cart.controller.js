const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the cart Test controller!');
};

exports.cart_create = function (req, res, next) {
    let cart = new Cart(
        {
            username: req.body.username,
            productID: req.body.productID,
            amount: req.body.amount,
            price: req.body.price
        }
    );

    cart.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
    })
    
    res.send (cart);
    res.send ('Comment successfully created.');

}; //create new user using the data coming from a POST request and save to database.

exports.cart_findAll = function (req, res, next) {

    Cart.find({}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};

exports.cart_update = function (req, res, next) {
    console.log(req.body);
    Cart.findOneAndUpdate({"productID": req.body.productID}, {$inc: {amount: req.body.amount}}, function (err, cart) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(cart);
    });
};

exports.cart_amount = function (req, res, next) {
    console.log(req.body);
    Cart.findOneAndUpdate({"_id": req.body._id}, {$inc: {amount: req.body.amount}}, function (err, cart) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(cart);
    });
};

exports.cart_delete = function (req, res, next) {
    Cart.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
    })
};

exports.cart_delete_all = function (req, res, next) {
    Cart.deleteMany({"username": req.body.username}, function (err) {
        if (err) return next(err);
    })
};

exports.delete = function (req, res, next) {
     Cart.remove({}, function (err) {
        if (err) return next(err);
    })
};