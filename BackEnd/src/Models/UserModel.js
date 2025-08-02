const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  email: {type: String, required: true, unique: true},

  password: {type: String, required: true},

  token: {type: String, required: true},

  notes: [
    {
      id: {type:Number},

      title: {type:String},

      note: {type:String}
    }
  ],

  createdAt: {type: Date, default: Date.now}

})

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;