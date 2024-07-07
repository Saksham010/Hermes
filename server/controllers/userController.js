const {User} = require('../modals/userModal');
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const {sendMail} = require("../helpers/mailer");

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
            fname,
            lname,
            email,
            password:hashedPassword
        });

        //Check if email already exists
        const isExist = User.findOne({email:email})
    
        if(isExist){
            return res.status(400).json({
                status:false,
                msg:"Email already registered"
            })
        }else{

            //Save records to db
            const userData = await user.save();
            const verificationMessage = `<p>Hello ${fname}, Please verify your email at `+'<a href="http://127.0.0.1:3000/verify/mail-verification?id='+user.id+'">Verify Email </a> </p>';

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

}

const resetPassword = async (req,res)=>{

}



module.exports = {registerUser,loginUser,resetPassword,emailVerification}
