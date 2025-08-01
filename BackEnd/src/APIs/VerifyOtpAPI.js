const express = require("express");
const log = require("../Utils/log");
const FindOne = require("../Utils/FindOne");
const TempUserModel = require("../Models/TempUserModel");
const InsertOne = require("../Utils/InsertOne");
const UserModel = require("../Models/UserModel");
const BcryptHash = require("../Utils/BcryptHash");
const DeleteOne = require("../Utils/DeleteOne")
const router = express.Router();



router.post("/", async (req, res) => {

  try
  {
    const {email, otp} = req.body;

    log(email, otp)

    if(!email)
    {
      log("email is required")
      return res.status(400).json({message: "something went wrong"})
    }

    if(!otp)
    {
      log("otp is required")
      return res.status(400).json({message: "something went wrong"})
    }

    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email))
    {
      log("invalid email format")
      return res.status(400).json({message: "something went wrong"})
    }

    if(!(/^\d{6}$/).test(otp))
    {
      log("invalid otp. it must be 6 digits")
      return res.status(400).json({message: "something went wrong"})
    }

    const filter = {email}
    const dataObj = await FindOne(TempUserModel, filter)

    if(!dataObj || !dataObj.email || !dataObj.password || !dataObj.otp)
    {
      log("no pending verification found for this email")
      return res.status(400).json({message: "something went wrong"})
    }

    if(dataObj.otp !== otp)
    {
      log("incorrect otp")
      return res.status(400).json({message: "something went wrong"})
    }

    dataObj.password = await BcryptHash(dataObj.password)

    const insertSuccess = await InsertOne(UserModel, dataObj)

    if(!insertSuccess)
    {
      log("failed to insert user to the Users")
      return res.status(400).json({message: "something went wrong"})
    }

    const deleteSuccess = await DeleteOne(TempUserModel, filter)

    if(!deleteSuccess)
    {
      log("failed to delete user from TempUsers")
    }
    
    return res.status(200).json({message: "success"})
  }
  catch(err)
  {
    log("VerifyOtpAPI failed :=== " + err);
    return res.status(500).json({message: "unexpected error"})
  }

})

module.exports = router;