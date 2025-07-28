const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const log = require("./src/Utils/log");

const RetrieveNotesAPI = require("./src/APIs/RetrieveNotesAPI");
const UpdateNotesAPI = require("./src/APIs/UpdateNotesAPI");
const DeleteNotesApi = require("./src/APIs/DeleteNotesAPI");

const Connect = async () => {

  try
  {
    await mongoose.connect(process.env.MONGODB_URI)

    app.use(cors({
      origin: process.env.FRONTEND_ORIGIN || "*",
      credentials: true
    }))
    app.use(express.json())

    app.use("/api/notes/retrieve", RetrieveNotesAPI);
    app.use("/api/notes/update", UpdateNotesAPI);
    app.use("/api/notes/delete", DeleteNotesApi);

    app.listen(process.env.PORT || 5000)
    log("Connected");
  }
  catch(err)
  {
    log("Err :=== " + err);
    log("Not Connected");
  }
  
}

Connect();