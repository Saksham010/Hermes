const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_verified:{
        type:Number,
        default:0
    },
})

const userModal = mongoose.model("User",userSchema);

module.exports = {User:userModal}