const express = require("express");
const RetrieveAll = require("../Functions/RetrieveAll");
const AllNotesCollection = require("../Collections/AllNotesCollection");
const router = express.Router()

router.get("/", async (req, res) => {

  try
  {
    const result = await RetrieveAll(AllNotesCollection);
    return res.status(200).json({message: "success", data: result});
  }
  catch(err)
  {
    console.log("RetrieveNotesAPI Error :=== " + err);
    return res.status(500).json({message: "failed"})
  }

})

module.exports = router;