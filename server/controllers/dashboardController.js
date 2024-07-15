const jwt = require("jsonwebtoken");
const {User} = require('../modals/userModal');


const getUserDetail = async (req,res) =>{


    try {
        //Check for token
        const token = req.cookies.access_token;
        console.log("Token: ",token);
        if (!token) {
            return res.status(403).json({status:false, msg:"Token not found"});
        }
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = data.email;

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

module.exports ={getUserDetail}