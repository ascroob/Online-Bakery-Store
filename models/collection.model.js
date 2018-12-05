const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CollectionSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    descrip: {type: String, required: true},
    prodName: {type:[String], required: false},
    privacy: {type: Boolean, required: false}
});


// Export the model
module.exports = mongoose.model('Collection', CollectionSchema);