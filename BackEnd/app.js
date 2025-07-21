const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

const Connect = () => {

  try
  {
    app.use(cors({
      origin: process.env.FORNTEND_ORIGIN || "*",
      credentials: true
    }))
    app.use(express.json())

    app.get("/api", async (req, res) => {

      console.log("api call received");
      res.json("api call received")

    })

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