const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed
    });

    const token = jwt.sign(
      { id: newUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

   
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    
    });

    res.status(201).json({
      message: "Signup successful",
      user: { name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = signUp;

