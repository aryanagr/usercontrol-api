const express =require('express');

const router=express.Router();

const User=require('../models/user');
const authenticate = require('../middelware/authenticate');
require('../config/db.js')
router.post('/',authenticate, async (req,res)=>{


    
    try{
        const{types,cardnumber,expirydate}=req.body;

        if(!types||!cardnumber||!expirydate){
            return res.json({error:"plzz fill all fields"});
        }
        
        const user = await User.findOne({ _id: req.rootuser._id});
        if(user){
             await user.addcards(types,cardnumber,expirydate)
        }
       
        res.status(201).json({message:"address add sucessfully"})

    }
    catch(err){
        console.log(err);
    }
    
    
    })
    module.exports=router;