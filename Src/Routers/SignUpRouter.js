const express=require('express');
const bcrypt=require('bcryptjs');
const LoginModel = require('../Models/LoginModel');
const SignUpModel = require('../Models/SignupModel');


const SignUpRouter = express.Router();

SignUpRouter.post('/registration', async (req, res) => {
    try {
        // Check if the user with the provided email already exists
        const olduser = await LoginModel.findOne({ email: req.body.email });
        if (olduser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'user already exists'
            });
        }
        // Hash the provided password
        const hashedpassword = await bcrypt.hash(req.body.password, 12);

        let log = {
            email: req.body.email,
            password: hashedpassword,
        };
        const result = await LoginModel(log).save();
        let reg = {
            login_id: result._id,
            name: req.body.name,
        };
        const result2 = await SignUpModel(reg).save();
        console.log("result2", result2);
        if (result2) {
            return res.status(201).json({
                success: true,
                error: false,
                message: 'registration completed',
                details: result2,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'something went wrong'
        });
        console.log(error);
    }
});

module.exports =SignUpRouter;