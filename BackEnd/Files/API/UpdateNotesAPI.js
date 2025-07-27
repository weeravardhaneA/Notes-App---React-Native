const express = require("express");
const UpdateOne = require("../Functions/UpdateOne");
const router = express.Router()


const AllNotesCollection = require("../Collections/AllNotesCollection");
const log = require("../Helpers/log");



router.post("/", async (req, res) => {

  try
  {
    log(1)

    const {DataArray} = req.body;

    log(DataArray)

    if(!Array.isArray(DataArray))
    {
      return res.status(400).json({message: "invalid data"})
    }

    log(2)

    await Promise.all(DataArray.map(async (item) => {

      if(!item.title)
      {
        throw new Error("Missing title or note");
      }

      log(3)

      const filter = {id: item.id}
      const fieldsToUpdate = {$set: {title: item.title, note: item.note}}
      return UpdateOne(AllNotesCollection, filter, fieldsToUpdate)

    }))

    log(4)

    return res.status(200).json({message: "success"})
  }
  catch(err)
  {
    log("Update Failed", err.message);
    return res.status(500).json({message: "failed"})
  }

})

module.exports = router;