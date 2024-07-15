require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const mailVerificationRoute = require('./routes/mailVerificationRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");


// Connect to mongodb database
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const app = express();
const PORT = process.env.PORT | 8000;

app.set('view engine','ejs');
app.set('views','./views');

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};


app.use(cors(corsOptions));
app.use(cookieParser());


//Auth route
app.use('/auth',userRoute);
app.use('/verify',mailVerificationRoute);
app.use('/dashboard',dashboardRoute);
app.get('/',(req,res)=>{
    res.status(200).json({message:"Server OK!"});
})

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`);
})