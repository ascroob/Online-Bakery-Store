const Collection = require('../models/collection.model');
const mongoose = require('mongoose');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the collection Test controller!');
};