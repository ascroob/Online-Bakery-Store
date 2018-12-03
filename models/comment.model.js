const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    productID: {type: String, required: true},
    username: {type: String, required: true, max: 100},
    comment: {type: String, required: true, max: 100},
    rating: {type: Number}
});


// Export the model
module.exports = mongoose.model('Comment', CommentSchema);