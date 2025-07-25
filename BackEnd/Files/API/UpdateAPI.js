const express = require("express");
const UpdateOne = require("../Functions/UpdateOne");
const router = express.Router()


const AllNotesCollection = require("../Collections/AllNotesCollection");



router.post("/", async (req, res) => {

  try
  {
    const {DataArray} = req.body;
    
    for(const item of DataArray) {

      const filter = {id: item.id}

      const fieldsToUpdate = {$set: {title: item.title, note: item.note}}

      await UpdateOne(AllNotesCollection, filter, fieldsToUpdate)

    }

    return res.json({message: "Updated."})
  }
  catch(err)
  {
    console.log("Update Failed");
    return res.json({message: "Update Failed."})
  }

})

module.exports = router;