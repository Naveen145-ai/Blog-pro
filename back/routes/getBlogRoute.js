const route = require('express');
const router = route.Router();
const getBlog = require('../controllers/getBlogController');
const getSingleBlog = require('../controllers/getSingleBlogController');

router.get('/get-blog/:id', getSingleBlog);
router.get('/get-blogs', getBlog);
module.exports = router;

