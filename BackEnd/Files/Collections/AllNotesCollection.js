const mongoose = require("mongoose");

const AllNotesSchema = mongoose.Schema({

  id: {type:Number},

  title: {type:String},

  note: {type:String}

})

const AllNotesCollection = mongoose.model("AllNotesCollection", AllNotesSchema);

module.exports = AllNotesCollection;