const express =require('express');
const bcrypt = require('bcryptjs');
const router=express.Router();

const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
router.use(cookieParser());

require('../config/db.js')
const User=require('../models/user')

router.post('/',async (req,res)=>{
    const {logincred,password}=req.body;
    if(logincred==""||password=="") res.status(400).send({error:"plzz filled every column"});

    
try{
   
    const userLogin= await User.findOne({$or: [ {mobilenumber:logincred},{email:logincred} ]})
    if(userLogin ){

    const  isMatch=await bcrypt.compare(password,userLogin.password); 

    const token=await userLogin.generateAuthToken();
    
    res.cookie("jwtoken",token);

    if(!isMatch)return res.status(400).send({error:"  invalid credentials pass"});
    res.status(200).send({message:"login successfully"});  
}  

else return res.status(400).send({error:"  invalid   credentials"});
}
catch(err){console.log(err);}
})
module.exports=router;

