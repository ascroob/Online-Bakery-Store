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
            amount: req.body.amount
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

    Cart.find({username: req.body}, function (err, results){
       console.log(results); 
       res.send(results);
    });
};