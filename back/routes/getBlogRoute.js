const express = require('express');
const router = express.Router();

const getBlog = require('../controllers/getBlogController');
const getSingleBlog = require('../controllers/getSingleBlogController');

router.get('/get-blogs', getBlog);
router.get('/get-blog/:id', getSingleBlog);

module.exports = router;
