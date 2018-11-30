const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    username: {type: String, required: true, max: 100},
    productID: {type: String, required: true},
    amount: {type: Number, required: true}
});


// Export the model
module.exports = mongoose.model('Cart', CartSchema);