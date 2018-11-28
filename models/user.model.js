const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    manager: {type: Boolean, required: true},
    active: {type: Boolean, required: true}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);