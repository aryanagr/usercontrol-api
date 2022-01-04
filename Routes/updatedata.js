const express =require('express');
const bcrypt = require('bcryptjs');
const router=express.Router();

const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
router.use(cookieParser());

require('../config/db.js')
const User=require('../models/user');
const authenticate = require('../middelware/authenticate.js');

router.put('/',authenticate,async (req,res)=>{
    const {email,name,dob,mobilenumber}=req.body;
    
   
    
    
    
    try{
        const emailExist= await User.findOne({$and: [{email:email},{ _id: { $ne: req.rootuser._id }}] });
        if(emailExist)return res.status(422).send({error:"email already registered with another account"});

        const mobilenumberExist= await User.findOne({$and: [{mobilenumber:mobilenumber},{ _id: { $ne: req.rootuser._id }}]});
        if(mobilenumberExist)return res.status(422).send({error:"mobile number already registered  with another account"});
        
        else{
            const update= await User.findOneAndUpdate({_id:req.rootuser._id},{
              $set:{
                  email,name,dob,mobilenumber,
              }
            })
            if(update) res.status(201).json({message:'done update'});
            else res.status(500).json({error:"failed"});
        }
    
      
    }
    
    catch(err){console.log(err);}
    
    })
    module.exports=router;

