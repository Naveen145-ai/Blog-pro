const express = require('express');
const router = express.Router();

const searchBlogs = require('../controllers/searchBlogController');

router.get('/search', searchBlogs);

module.exports = router;
