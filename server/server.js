require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");

// Connect to mongodb database
mongoose.connect("mongodb://localhost:27017/");

const app = express();
const PORT = process.env.PORT | 3000;

app.set('view engine','ejs');
app.set('views','./views');

//Auth route
app.use('/auth',userRoute);

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`);
})