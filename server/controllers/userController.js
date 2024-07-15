const {User} = require('../modals/userModal');
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const {sendMail} = require("../helpers/mailer");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{
    try{
        //Validate inputs
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Validation error',
                errors:error.array()
            })
        }

        const {fname,lname,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            firstname:fname,
            lastname:lname,
            email,
            password:hashedPassword
        });

        //Check if email already exists
        const isExist = await User.findOne({email:email})
        console.log("Email exists? : ",isExist);
    
        if(isExist){
            return res.status(400).json({
                status:false,
                msg:"Email already registered"
            })
        }else{

            //Save records to db
            const userData = await user.save();
            const verificationMessage = `<p>Hello ${fname}, Please verify your email at `+'<a href="http://127.0.0.1:'+process.env.PORT+'/verify/mail-verification?id='+user.id+'">Verify Email </a> </p>';

            //Send verification email
            await sendMail(email,"Email verification",verificationMessage);

            //Send response
            return res.status(200).json({
                status:true,
                msg:"Registration successfull",
                data:{fname:userData.fname,lname:userData.lname,email:userData.email}
            })
        }

    }catch(err){
        console.log("Error: ",err);
        return res.status(400).json({
            success:false,
            msg:err.message
        })
    }
}

const emailVerification = async (req,res)=>{

    try{
        const passedId = req.query.id;
        //If verification link is invalid
        if(passedId === undefined){
            console.log("Invalid verified link");
            return res.render('404');
        }else{

            const userData = User.findOne({_id:passedId});

            // If passed id doesnt exist
            if(!userData){
                console.log("User does not exist");
                return res.render('mail-verification',{message:"User does not exist"});

            }else{
                //If user is already verified
                if(userData.is_verified){
                    console.log("User is already verified");
                    return res.render('mail-verification',{message:"Mail already verified"});
                }

                //Update verified
                await User.findByIdAndUpdate({_id:passedId},{
                    $set:{
                        is_verified:1
                    }
                })
                return res.render('mail-verification',{message:"Mail sucessfully verified"});

            }
    
        }
        
    }catch(err){
        console.log(err.message);
        return res.render('404');
    }

}

const loginUser = async (req,res)=>{
    try{
        //Validate inputs
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Validation error',
                errors:error.array()
            })
        }

        const {email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("Hashed password: ",hashedPassword);

        //Check if email already exists
        const isExist = await User.findOne({email:email})
        console.log("Email exists? : ",isExist);
    
        if(!isExist){
            return res.status(400).json({
                status:false,
                msg:"Email not registered"
            })
        }else{
            const retrievedPassHash = isExist.password;
            const firstname = isExist.firstname;
            const lastname = isExist.lastname;
            const isEqual = bcrypt.compareSync(password,retrievedPassHash);
            console.log("Is Equal: ",isEqual);

            if(!isEqual){
                return res.status(200).json({
                    status:false,
                    msg:"Wrong password",
                })
            }

            const token = jwt.sign({firstname,lastname,email},process.env.JWT_SECRET_KEY,{
                expiresIn: '1h'
            });
            //Send token as a cookie
            return res.cookie("access_token", token, {
                httpOnly: false,
                sameSite: 'None',
                secure:true,
              }).status(200).json({
                status:true,
                msg:"Login successfull",
                data:{firstname,lastname,email}
            })
        }

    }catch(err){
        console.log("Error: ",err);
        return res.status(400).json({
            success:false,
            msg:err.message
        })
    }

}

const resetPassword = async (req,res)=>{

}



module.exports = {registerUser,loginUser,resetPassword,emailVerification}
