const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');

// Add a comment to a blog (supports anonymous via name + text, or logged-in user)
router.post('/blog/:id/comments', addComment);
// Get comments for a blog
router.get('/blog/:id/comments', getComments);

module.exports = router;
