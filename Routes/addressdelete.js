const express =require('express');

const router=express.Router();

const User=require('../models/user');
const authenticate = require('../middelware/authenticate');
require('../config/db.js')
router.patch('/',authenticate, async (req,res)=>{


    
    try{
        const{_id}=req.body;

        if(!_id){
            return res.json({error:"plzz fill all fields"});
        }
       
        const update = await User.updateOne({_id:req.rootuser._id},
             
            {
                $pull:{
                   addresses:{_id:_id}
                }
                }
            
        );
        
       
        
        if(update) res.status(201).json({message:'done update'});
        else res.status(500).json({error:"failed"});

    }
    catch(err){
        console.log(err);
    }
    
    
    })
module.exports=router;