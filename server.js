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

app.get('/',(req,res)=>{
    res.send('login and signup');
});
app.use((req,res) => {
    res.status(404).json({message : "Page Not Found"})
})

const startServer = async(port) => {
    await connectDB()

    app.listen(port, ()=> console.log(`Server started on http://localhost:${port}`))
}
startServer(PORT)