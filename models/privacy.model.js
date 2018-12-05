const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PrivacySchema = new Schema({
    section: {type: String, required: true},
    text: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Privacy', PrivacySchema);