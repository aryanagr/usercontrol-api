const nodemailer = require("nodemailer");
const express =require('express');
const router=express.Router();
const User=require('../models/user')
const authenticate = require('../middelware/authenticate.js');
const mailOtp = (mailTo, otp) => {
    const transporter = nodemailer.createTransport({
        service: "outlook.com",
        secure: false,
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    });

    const body=`otp  ${otp}`

    const mailOptions = {
        from: "aryana72@outlook.com",
        to: mailTo,
        subject: "LinkIt OTP",
        html: body,
    };

    transporter.sendMail(mailOptions, (error) => {
        error && console.log(error);
    });
};

router.post('/', async (req, res) => {
    const {email}=req.body;
     

    try {
        const user = await User.findOne({ email:email });
        
        
        
        if (user) {
            
            
            
            const otpExpire = new Date(new Date().getTime() + 30 * 60 * 1000);
            
            const otp=Math.floor(100000 + Math.random() * 900000);
            mailOtp(user.email, otp);
            const update = await user.updateOne({
                    $set:{
                        'otp.otpno':otp,
                        'otp.expirydate':otpExpire
                    }
                    });

            return res.json({
                status: "ok",
                message: "OTP sent successfully",
            });
        } else {
            return res.json({ status: "error", error: "User not found" });
        }
    } catch (error) {
        console.log(error)
        return res.json({
            status: "error",
            error: "Some error occurred",
        });
    }
});

module.exports =router;
