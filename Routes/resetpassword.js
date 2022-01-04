const nodemailer = require("nodemailer");
const express =require('express');
const router=express.Router();
const User=require('../models/user')
const bcrypt = require('bcryptjs');
const authenticate = require('../middelware/authenticate.js');

router.post('/', async (req, res) => {
  const {email,otp,password}=req.body;
  if(!otp||!password){
    return res.json({error:"plzz fill all fields"});
}
try{
const user = await User.findOne({ email:email });
    if(user){
        if (user.otp.otpno == otp) {
            if (user.otp.expirydate >= new Date()) {
                await user.updateOne({
                    $set:{
                        'password':await bcrypt.hash(req.body.password,12)
                    }
                    });
                    return res.json({
                        status: "ok",
                        message: "password upadted",
                    });
            }
            else {
                return res.json({ status: "error", error: "otp expire" });
            }
        }
        else {
            return res.json({ status: "error", error: "otp not match" });
        }
    }
    else {
        return res.json({ status: "error", error: "User not found" });
    }
}

catch(err){
    console.log(err);
}

})
module.exports =router;