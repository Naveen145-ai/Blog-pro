const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const addToWishlist = require('../controllers/wishListController');
const getWishlist = require('../controllers/getWishListController');
const removeFromWishlist = require('../controllers/wishListController').removeFromWishlist;

router.post('/wishlist', auth, addToWishlist);
router.get('/wishlist', auth, getWishlist);
router.delete('/wishlist/:blogId', auth, removeFromWishlist);

module.exports = router;
