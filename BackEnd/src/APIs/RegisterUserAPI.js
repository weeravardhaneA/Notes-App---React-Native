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
      log("Please enter a valid email and a password with at least 8 characters.")
      return res.status(400).json({message: "something went wrong"})
    }

    const filter = {email}
    const accExistsUsers = await FindOne(UserModel, filter)
    const accExistsTempUsers = await FindOne(TempUserModel, filter)
    
    if(accExistsUsers || accExistsTempUsers)
    {
      log("Account with this email already exists in the Users or TempUsers.")
      return res.status(400).json({message: "something went wrong"})
    }

    const otp = OtpGenerator();

    if(!otp)
    {
      log("Failed to generate OTP.")
      return res.status(400).json({message: "something went wrong"})
    }

    const emailResult = await NodeMailer(email, otp)

    if(!emailResult)
    {
      log("Failed to send the OTP email.")
      return res.status(400).json({message: "something went wrong"})
    }

    const newDoc = {email, password, otp}
    const insertResult = await InsertOne(TempUserModel, newDoc)

    if(!insertResult)
    {
      log("failed to insert user to the TempUsers.")
      return res.status(400).json({message: "something went wrong"})
    }

    res.status(200).json({message: "success" })
  }
  catch(err)
  {
    log("RegisterUserAPI failed :=== " + err);
    return res.status(500).json({success: false, message: "unexpected error."})
  }

})

module.exports = router;