const User = require('../models/userModel');

const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { blogId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    if (user.wishlist.includes(blogId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(blogId);
    await user.save();

    res.status(200).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.wishlist.includes(blogId)) {
      return res.status(400).json({ error: "Blog not in wishlist" });
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== blogId);
    await user.save();

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = addToWishlist;
module.exports.removeFromWishlist = removeFromWishlist;
