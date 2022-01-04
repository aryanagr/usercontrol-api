const express =require('express');
const router=express.Router();
const User=require('../models/user')
const {OAuth2Client}=require('google-auth-library')
const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
router.post('/', async (req,res)=>{
const {tokenId}=req.body;


 const response= await client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID})


 try{
    const{email_verified,name,email}=response.payload;
    if(email_verified){
        const user=await User.findOne({email})
        if(user){
                const token=await user.generateAuthToken(); 
                res.cookie("jwtoken",token);
                res.status(200).send({message:"login successfully"}); 
                }
         else{
              let password=email+name;
              let validatecheck=true;
            const user=new User({email,name,password,validatecheck});
            const userRegister=await user.save();
            
            if(userRegister) {
                const token=await user.generateAuthToken(); 
                res.cookie("jwtoken",token);
                res.status(200).send({message:"login successfully"}); 
            }
            else res.status(500).json({error:"failed"});
         }       
    }
    else{
    
                return res.status(400).json({
                    error:"something went wrong"
                })
            
        }
 }
 catch(err){console.log(err);}

})
module.exports =router;