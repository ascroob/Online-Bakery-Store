const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DmcaSchema = new Schema({
    copyright: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    violation: {type: String, required: true},
    complaint: {type: String, required: true},
    resolved: {type: Boolean, required: true},
    notice: {type: Boolean, required: true}
});


// Export the model
module.exports = mongoose.model('Dmca', DmcaSchema);