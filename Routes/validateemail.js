const express =require('express');
const router=express.Router();
const User=require('../models/user')
const authenticate = require('../middelware/authenticate.js');
router.post('/',authenticate, async (req,res)=>{
    try{
        const{otp}=req.body;

        if(!otp){
            return res.json({error:"plzz fill all fields"});
        }
        const user = await User.findOne({ _id:req.rootuser._id });
        if(user){
        if (user.otp.otpno == otp) {
            if (user.otp.expirydate >= new Date()) {
                await user.updateOne({
                    $set:{
                        'validatecheck':true
                    }
                    });
                    return res.json({
                        status: "ok",
                        message: "email validate",
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
module.exports=router;