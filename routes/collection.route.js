const express = require('express');
const router = express.Router();

// Require the controllers 
const collection_controller = require('../controllers/collection.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', collection_controller.test);
//router.post('/create', collection_controller.collection_create);
//router.get('/all', cart_controller.cart_findAll);
//router.put('/update', cart_controller.cart_update);
//router.delete('/:id/delete', cart_controller.cart_delete);

module.exports = router;