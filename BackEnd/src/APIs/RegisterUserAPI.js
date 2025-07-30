const express = require("express");
const FindOne = require("../Utils/FindOne");
const UserModel = require("../Models/UserModel");
const router = express.Router();
const OtpGenerator = require("../Utils/OtpGenerator");
const NodeMailer = require("../Utils/NodeMailer");
const InsertOne = require("../Utils/InsertOne");
const TempUserModel = require("../Models/TempUserModel");
const log = require("../Utils/log");


router.post("/", async (req, res) => {

  try
  {
    const {email, password} = req.body;

    if(!email || !password || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) || password.length < 8)
    {
      return res.status(400).json({success: false, message: "Please enter a valid email and a password with at least 8 characters."})
    }

    const filter = {email}
    const accExistsUsers = await FindOne(UserModel, filter)
    const accExistsTempUsers = await FindOne(TempUserModel, filter)
    
    if(accExistsUsers || accExistsTempUsers)
    {
      return res.status(400).json({success: false, message: "Registration failed. Please try again."})
    }

    const otp = OtpGenerator();

    if(!otp)
    {
      return res.status(400).json({success: false, message: "Failed to generate OTP. Please try again later."})
    }

    const emailResult = await NodeMailer(email, otp)

    if(!emailResult)
    {
      return res.status(400).json({success: false, message: "Failed to send the OTP email. Please try again later."})
    }

    const newDoc = {email, password, otp}
    const insertResult = await InsertOne(TempUserModel, newDoc)

    if(!insertResult)
    {
      return res.status(400).json({success: false, message: "Something went wrong. Please try again later."})
    }

    res.status(200).json({ success: true, message: "A verification code has been sent to your email." })
  }
  catch(err)
  {
    log("RegisterUserAPI failed :=== " + err);
    return res.status(500).json({success: false, message: "An unexpected server error occurred. Please try again."})
  }

})

module.exports = router;