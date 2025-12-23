const User = require("../models/userModel");

const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email createdAt lastLoginAt");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = me;
