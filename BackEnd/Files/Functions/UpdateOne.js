const InsertOne = require("./InsertOne");

const UpdateOne = async (collection, filter, fieldsToUpdate) => {

  try
  {
    const result = await collection.updateOne(filter, fieldsToUpdate, {upsert: true})
    log(result);
  }
  catch(err)
  {
    log("UpdateOne Failed :=== " + err);
  }

}

module.exports = UpdateOne;