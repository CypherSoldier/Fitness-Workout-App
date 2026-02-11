//var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

// user_controller.js
const createAccount = async (req, res) => {
  try {
    const { display_name, email, password } = req.body;
    
    if (!display_name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      display_name,
      email,
      password: hashedPassword
    });

    console.log(`User created:`, user);
    
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ message: 'User data is not valid' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            display_name: user.display_name,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: 'Email or password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAccount, loginUser, currentUser }