const express = require("express");
const UpdateOne = require("../Utils/UpdateOne");
const router = express.Router()


const AllNotesCollection = require("../Models/AllNotesModel");
const log = require("../Utils/log");



router.post("/", async (req, res) => {

  try
  {

    const {DataArray} = req.body;

    log(DataArray)

    if(!Array.isArray(DataArray))
    {
      return res.status(400).json({message: "invalid data"})
    }

    await Promise.all(DataArray.map(async (item) => {

      if(!item.title)
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
    log("Update Failed", err.message);
    return res.status(500).json({message: "failed"})
  }

})

module.exports = router;