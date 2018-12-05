const express = require('express');
const router = express.Router();

// Require the controllers 
const privacy_controller = require('../controllers/privacy.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', privacy_controller.test);
router.get('/all', privacy_controller.find_all);
router.post('/create', privacy_controller.create_section);
router.put ('/:id/edit', privacy_controller.edit_section);

module.exports = router;