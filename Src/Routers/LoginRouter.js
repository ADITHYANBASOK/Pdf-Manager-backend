const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LoginModel = require('../Models/LoginModel');


const LoginRouter = express.Router();




LoginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;  
  
  try {
   
    if (email && password) {
      const oldUser = await LoginModel.findOne({ email });
      if (!oldUser)
        return res
          .status(404)
          .json({ success: false, error: true, message: "User doesn't Exist" });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ success: false, error: true, message: 'Incorrect password' });

      // Generate a JSON Web Token (JWT) for user authentication
      const token = jwt.sign(
        {
          userId: oldUser._id,
          useremail: oldUser.email,
        },
        'secret_this_should_be_longer',      
        { expiresIn: '1h' }         // Token expiration time (1 hour in this case)  
      );
      console.log('token', token);
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        useremail: oldUser.email,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'All fields are required!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = LoginRouter;