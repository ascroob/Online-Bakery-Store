const express = require('express');
const router = express.Router();

// Require the controllers 
const user_controller = require('../controllers/user.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
router.post('/create', user_controller.user_create);
router.get('/all', user_controller.user_findAll);

module.exports = router;