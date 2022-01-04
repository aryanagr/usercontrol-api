const express =require('express');
const authenticate=require("../middelware/authenticate");

const router=express.Router();
require('../config/db.js')
const User=require('../models/user')
router.get('/',authenticate, async(req,res)=>{
    res.send(req.rootUser);
})
module.exports = router;