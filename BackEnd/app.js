const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const GetData = require("./Files/API/GetData")
const UpdateAPI = require("./Files/API/UpdateAPI")

const Connect = async () => {

  try
  {
    await mongoose.connect(process.env.MONGODB_URI)

    app.use(cors({
      origin: process.env.FRONTEND_ORIGIN || "*",
      credentials: true
    }))
    app.use(express.json())

    app.use("/api/get-data", GetData);
    app.use("/api/update", UpdateAPI);

    app.listen(process.env.PORT || 5000)
    console.log("Connected");
  }
  catch(err)
  {
    console.log("Err :=== " + err);
    console.log("Not Connected");
  }
  
}

Connect();