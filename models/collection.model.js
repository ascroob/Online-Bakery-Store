const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CollectionSchema = new Schema({
    
});


// Export the model
module.exports = mongoose.model('Collection', CollectionSchema);