const express = require("express");
const DeleteOne = require("../Utils/DeleteOne");
const router = express.Router();

const AllNotesCollection = require("../Models/AllNotesModel");
const log = require("../Utils/log");


router.post("/", async (req, res) => {

  try
  {
    const {DataArray} = req.body;
  
    if(!Array.isArray(DataArray))
    {
      throw new Error(`Invalid Data`)
    }
  
    await Promise.all(DataArray.map((item) => {

      if(!item.id)
      {
        throw new Error("Missing item.id")
      }
  
      const filter = {id: item.id}
      return DeleteOne(AllNotesCollection, filter)
  
    }))

    return res.status(200).json({message: "success"})
  }
  catch(err)
  {
    log("DeleteNotesAPI Failed :=== " + err);
    return res.status(500).json({message: "failed"})
  }

})


module.exports = router;