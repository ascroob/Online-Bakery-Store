const express = require('express');
const router = express.Router();

// Require the controllers 
const comment_controller = require('../controllers/comment.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', comment_controller.test);
router.post('/create', comment_controller.comment_create);
router.get('/all', comment_controller.comment_findAll);
router.put ('/:id/hide', comment_controller.comment_hide);
router.put ('/:id/restore', comment_controller.comment_restore);

module.exports = router;