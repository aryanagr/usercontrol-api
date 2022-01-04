const express =require('express');
const bcrypt = require('bcryptjs');
const router=express.Router();

const User=require('../models/user')
require('../config/db.js')

router.post('/',async (req,res)=>{
    const {email,name,dob,mobilenumber,password}=req.body;
    
    
    if(  !email||!name||!dob||!mobilenumber||!password){
       return res.status(422).send({error:"plzz filled every column"});
    }
    
    
    
    try{
        const emailExist= await User.findOne({email:email});
        if(emailExist)return res.status(422).send({error:"email already registered"});

        const mobilenumberExist= await User.findOne({mobilenumber:mobilenumber});
        if(mobilenumberExist)return res.status(422).send({error:"mobile number already registered"});
        
        else{
            const user=new User({email,name,dob,mobilenumber,password});
    
            const userRegister=await user.save();
            
            if(userRegister) res.status(201).json({message:'done storing'});
            else res.status(500).json({error:"failed"});
        }
    
      
    }
    
    catch(err){console.log(err);}
    
    })
    module.exports=router;