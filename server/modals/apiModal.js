const mongoose = require("mongoose");

const APISchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    apiName:{
        type:String,
        required:true
    },
    apiKey:{
        type:String,
        required:true
    },
    dateCreated:{
        type:String,
        required:true
    },
    selectedChain:{
        type:Array,
        required:true
    }
})

const APIMODEL = mongoose.model("API",APISchema);
module.exports = {APIMODEL};