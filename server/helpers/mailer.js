const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async (email,subject,message)=>{

    const messageOptions = {
        from:process.env.SMTP_MAIL,
        to:email,
        subject:subject,
        html:message
    }

    try{
        transporter.sendMail(messageOptions,(error,info)=>{
            if(error){
                console.log("Error: ",error);
            }else{
                console.log("Message id: ",info.messageId);
            }
        })
    }catch(err){
        console.log("Error while sending mail: ",err);
    }
}

module.exports = {sendMail}