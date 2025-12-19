const route = require('express');
const router = route.Router();
const getBlog = require('../controllers/getBlogController');
router.get('/get-blogs', getBlog);
module.exports = router;

