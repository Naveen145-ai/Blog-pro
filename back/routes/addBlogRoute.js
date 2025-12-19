const express = require('express');
const router = express.Router();

const addBlog = require('../controllers/addBlogController');


router.post('/add-blog',addBlog);

module.exports = router;