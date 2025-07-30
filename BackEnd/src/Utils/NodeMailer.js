const nodemailer = require("nodemailer")
const log = require("./log")

const NodeMailer = async (email, otp) => {

  try
  {
    const transport = nodemailer.createTransport({
  
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PW,
      }
  
    })
  
    const emailObj = {
  
      from: process.env.GMAIL,
      to: email,
      subject: "Confirm Your Email",
      text: "Your OTP is "+otp+" this OTP is valid for 5 minutes.",
  
    }
  
    return await transport.sendMail(emailObj)
  }
  catch(err)
  {
    log("NodeMailer failed :=== " + err);
    return false;
  }

}

module.exports = NodeMailer;