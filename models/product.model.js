const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    descrip: {type: String, required: true, max: 100},
    quantity: {type: Number, required: true},
    purchased: {type: Number, required: true, min:0},
    hidden: {type: Boolean, required: true},
    rating: {type: Number, required: false},
    numRates: {type: Number, required: false}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);