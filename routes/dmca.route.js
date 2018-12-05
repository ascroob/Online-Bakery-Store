const express = require('express');
const router = express.Router();

// Require the controllers 
const dmca_controller = require('../controllers/dmca.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', dmca_controller.test);
router.get('/all', dmca_controller.find_all);
router.post('/create', dmca_controller.create_dmca);
router.put ('/:id/resolve', dmca_controller.resolve);
router.put ('/:id/notice', dmca_controller.notice);

module.exports = router;