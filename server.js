const express=require('express');
const dotenv=require('dotenv');
const cors = require('cors')

const app=express();
app.use(express.json());
dotenv.config({path: './config.env'})

 const PORT=process.env.PORT||4000
 const connectDB = require('./config/db')
 app.use(cors({ credentials: true, origin: true}))

 const login = require('./Routes/login');
 const getdata = require('./Routes/getdata')
 const signup = require('./Routes/signup')
 const logout = require('./Routes/logout')
 const updatedata = require('./Routes/updatedata')
 const updatepassword = require('./Routes/updatepassword')
 const addressadd = require('./Routes/addressadd')
 const addressdelete = require('./Routes/addressdelete')
 const addressedit = require('./Routes/addressedit')
 const debitcardedit = require('./Routes/debitcardedit')
 const debitcardadd = require('./Routes/debitcardadd')
 const debitcarddelete = require('./Routes/debitcarddelete')
 const mailotp = require('./Routes/mailotp')
 const validateemail = require('./Routes/validateemail')
 const googlelogin = require('./Routes/googlelogin')
 const resetpassword = require('./Routes/resetpassword')

 app.use('/api/login',login)
app.use('/api/signup', signup);
app.use('/api/logout', logout);
app.use('/api/getdata', getdata);
app.use('/api/updatedata', updatedata);
app.use('/api/updatepassword', updatepassword);
app.use('/api/addressadd', addressadd);
app.use('/api/addressedit', addressedit);
app.use('/api/addressdelete', addressdelete);
app.use('/api/debitcarddelete', debitcarddelete);
app.use('/api/debitcardadd', debitcardadd);
app.use('/api/debitcardedit', debitcardedit);
app.use('/api/mailotp', mailotp);
app.use('/api/validateemail',validateemail);
app.use('/api/googlelogin',googlelogin);
app.use('/api/resetpassword',resetpassword);


const message=[
    "welcome to  user control api",
    "routes                                 req                                       type",

    "/api/signup                    email,name,dob,mobilenumber,password              post",
    "/api/login                     email/mobilenumber,passowrd                       post",
    "/api/logout                                                                      get ",
    "/api/getdata                                                                     get",
    "/api/updatedata                email,name,dob,mobilenumber                       post",
    "/api/resetpassword             email,otp,password                                post",
    "/api/updatepassword            password,newpassword                              put",
    "/api/googlelogin               tokenid                                           post",
    "/api/validateemail             otp                                               post",
    "/api/mailotp                   email                                             post",
    "/api/debitcardedit             _id,types,cardnumber,expirydate                   patch",
    "/api/debitcardadd              types,cardnumber,expirydate                       post",
    "/api/debitcarddelete           _id                                               patch",
    "/api/addressdelete             _id                                               patch",
    "/api/addressedit               _id,types,address                                 patch",
    "/api/addressadd                types,address                                     post",
        ` `,
       ` `,
    "schema example",
     ` `,
    `_id:ObjectId("61d49c63919fded5418895bb")`,
    ` email:"hi@gamil.com"`,
    `name:"abc"`,
    `dob:"2012-17-03"`,
    `mobilenumber:"1234567890"`,
    `password:"$2a$12$WX/Hd7jUB2Tp.5CmR3zO3egrAHDgcVAtR1EIryHW9SfpC2XYO6pPy"`,
    `validatecheck:false`,
    `addresses:Array`,
    `   0:Object`,
    `       types:"home"`,
    `       address:" at home"`,
    `       _id:ObjectId("61d49ebfe3ff4312d3769ccc")`,
    `cards:Array`,
   `    0:Object`,
    `       types:"debit"`,
    `       cardnumber:"1234567812341234"`,
    `       expirydate:"12/2021"`,
    `       _id:ObjectId("61d49d8ae3c8cbf59e087ce1")`,
    `tokens:Array`,
    `   0:Object`,
    `       token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ0OWM2MzkxOWZkZWQ1N..."`,
    `       _id:ObjectId("61d49f04e3ff4312d3769cd1")`,
    `__v:3`,
    `otp:Object`,
    `   expirydate:2022-01-04T19:56:05.653+00:00`,
    `   otpno:638863`


   
        







];



app.get('/',(req,res)=>{
    res.json(message);
    
    
});
app.use((req,res) => {
    res.status(404).json({message : "Page Not Found"})
})

const startServer = async(port) => {
    await connectDB()

    app.listen(port, ()=> console.log(`Server started on http://localhost:${port}`))
}
startServer(PORT)
