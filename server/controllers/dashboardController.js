const jwt = require("jsonwebtoken");
const {User} = require('../modals/userModal');
const {APIMODEL} = require("../modals/apiModal");
const crypto = require("crypto");

//Fetch user details
const getUserDetail = async (req,res) =>{

    try {
        //Retrieve token
        const email = req.authMiddleware.email;
        console.log("Email: ",email)
        const isExist = await User.findOne({email:email})
        console.log("Email exists? : ",isExist);
        if(!isExist){
            return res.status(400).json({status:false,msg:"User does not exist"});
        }else{
            return res.status(200).json({status:true,msg:"Data fetch sucessful",data:{
                email:isExist.email,
                firstname:isExist.firstname,
                lastname:isExist.lastname
            }})
        }
    } catch(err) {
      return res.status(403).json({status:false,msg:err});
    }

}
//Create new API Key
const createAPIKey = async (req,res) =>{
    try{
        const email = req.authMiddleware.email;
        const {apiName,choosenChainList} = req.body;
        var randomString = crypto.randomBytes(20).toString('hex');

        const _api = new APIMODEL({
            email,
            apiName,
            apiKey:randomString,
            dateCreated:new Date().toISOString(),
            selectedChain:choosenChainList
        });

        const data = await _api.save();
        console.log("Data: ",data);      
        return res.status(200).json({status:true,msg:"New API key successfully created",data:data});
    }catch(err){
        return res.status(400).json({status:false,msg:err.msg});
    }
}

//Fetch API key
const fetchAPIDetail = async (req,res)=>{
    try{
        const email = req.authMiddleware.email;
        const apiRecordList = await APIMODEL.find({email:email});
        return res.status(200).json({status:true,msg:"Api details successfully fetched",data:apiRecordList});

    }catch(err){
        return res.status(400).json({status:false,msg:err.msg});
    }
}

module.exports ={getUserDetail,createAPIKey,fetchAPIDetail}