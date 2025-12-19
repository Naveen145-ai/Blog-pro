const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const addToWishlist = require('../controllers/wishListController');
const getWishlist = require('../controllers/getWishListController');

router.post('/wishlist', auth, addToWishlist);
router.get('/wishlist', auth, getWishlist);

module.exports = router;
