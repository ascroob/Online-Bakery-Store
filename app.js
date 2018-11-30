// app.js
const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const user = require('./routes/user.route'); // Imports routes for users
const comment = require('./routes/comment.route'); // Imports routes for comments
const cart = require('./routes/cart.route'); // Imports routes for comments
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://ascroob:se3316@ds229648.mlab.com:29648/se3316-lab5';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/products', product);
app.use('/api/users', user);
app.use('/api/comments', comment);
app.use('/api/cart', cart);

let port = 8081;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});