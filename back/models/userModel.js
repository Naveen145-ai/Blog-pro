const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
