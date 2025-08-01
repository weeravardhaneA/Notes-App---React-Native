const mongoose = require("mongoose")

const TempUserSchema = new mongoose.Schema({

  email: {type: String, required: true},

  password: {type: String, required: true},

  otp: {type: String, required: true},

  createdAt: {type: Date, default: Date.now, expires: 300}

})

const TempUserModel = mongoose.model("TempUsers", TempUserSchema);

module.exports = TempUserModel;