const mongooose=require('mongoose')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongooose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
name:{
    type:String,
    required:true
},

dob:{
    type:String,
   
},

mobilenumber:{
    type:String,
    
},
password:{
    type:String,
    required:true
},
addresses:[{
    types:{
        type:String,
    },
    address:{
        type:String
    }
}],
cards:[{
    types:{
        type:String,
    },
    cardnumber:{
        type:String
    },
    expirydate:{
        type:String
    }
}],
validatecheck:{
    type:Boolean,
   default:false
},
otp:{

otpno:{
    type:Number
},
expirydate:{
  type:Date
}
},
tokens:[
    {
    token:{
        type:String,
    required:true

    }
}
]

})
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        
    }
    next();
})


userSchema.methods.generateAuthToken= async function (){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}
userSchema.methods.addaddress= async function(types,address){
    try{
        this.addresses = this.addresses.concat({types,address});
        await this.save();
        return this.addresses;
    }
    catch(err){
        console.log(err);
    }
}

userSchema.methods.addcards= async function(types,cardnumber,expirydate){
    try{
        this.cards = this.cards.concat({types,cardnumber,expirydate});
        await this.save();
        return this.cards;
    }
    catch(err){
        console.log(err);
    }
}
const User=new mongooose.model('USER',userSchema);
module.exports=User;