const express =require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();
var cookieParser = require('cookie-parser')
router.use(cookieParser());
require('../config/db.js')
const User=require('../models/user')

router.get('/', async(req,res)=>{
    
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("user logout");
    
    
    })
    module.exports = router;