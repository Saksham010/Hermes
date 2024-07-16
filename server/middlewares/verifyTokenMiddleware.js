const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next) =>{

    try{
        //Check for token
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({status:false, msg:"No token found in the request"});
        }

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = data.email;

        // Save email in request
        req.authMiddleware = {email};
        next();
    }catch(err){
        console.log("Error: ",err);
        return res.status(403).json({status:false,msg:err});

    }

}

module.exports = {authMiddleware}