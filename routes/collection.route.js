const express = require('express');
const router = express.Router();

// Require the controllers 
const collection_controller = require('../controllers/collection.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', collection_controller.test);
router.post('/create', collection_controller.collection_create);
router.get('/all', collection_controller.collection_findAll);
router.put('/:id/update', collection_controller.collection_amount);
router.delete('/:id/delete', collection_controller.collection_delete);
router.post('/:id/delete/product', collection_controller.collection_delete_product);
router.put('/:id/products', collection_controller.collection_add_product);

module.exports = router;