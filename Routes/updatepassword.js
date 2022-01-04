const express =require('express');
const bcrypt = require('bcryptjs');
const router=express.Router();

const User=require('../models/user');
const authenticate = require('../middelware/authenticate');
require('../config/db.js')

router.put('/',authenticate,async (req,res)=>{
    
    try{
        
            
        const userLogin= await User.findOne({_id:req.rootuser._id})
        const  isMatch=await bcrypt.compare(req.body.password,userLogin.password); 
        if(isMatch){
            const update= await User.updateOne({_id:userLogin._id},{
                
              $set:{
                 password:await bcrypt.hash(req.body.newpassword,12)
              }
            })
            if(update) res.status(201).json({message:'done update'});
            else res.status(500).json({error:"failed"});
        }
        else res.status(400).json({error:"current password is wrong"})
        }
    
      
    
    
    catch(err){console.log(err);}
    
    })
    module.exports=router;