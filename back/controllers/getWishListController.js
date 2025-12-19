const User = require('../models/userModel');

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("wishlist");

    res.status(200).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getWishlist;
