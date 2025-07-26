const express = require("express");
const UpdateOne = require("../Functions/UpdateOne");
const router = express.Router()


const AllNotesCollection = require("../Collections/AllNotesCollection");
const log = require("../Helpers/log");



router.post("/", async (req, res) => {

  try
  {
    const {DataArray} = req.body;

    if(!Array.isArray(DataArray))
    {
      return res.status(400).json({message: "invalid data"})
    }

    await Promise.all(DataArray.map((item) => {

      if(!item.title || !item.note)
      {
        throw new Error("Missing title or note");
      }

      const filter = {id: item.id}
      const fieldsToUpdate = {$set: {title: item.title, note: item.note}}
      return UpdateOne(AllNotesCollection, filter, fieldsToUpdate)

    }))

    return res.status(200).json({message: "success"})
  }
  catch(err)
  {
    log("Update Failed");
    return res.status(500).json({message: "failed"})
  }

})

module.exports = router;