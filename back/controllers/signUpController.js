const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const signUp = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const exits = await User.findOne({email});

        if(exits){
            return res.status(400).json({"User already exits":true});
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({name,email,password:hashed});

       
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user: { name: newUser.name, email: newUser.email }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }



    }

    module.exports = signUp;
