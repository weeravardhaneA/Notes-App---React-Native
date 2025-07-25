const InsertOne = require("./InsertOne");

const UpdateOne = async (collection, filter, fieldsToUpdate) => {

  try
  {
    const result = await collection.updateOne(filter, fieldsToUpdate, {upsert: true})
    console.log(result);
  }
  catch(err)
  {
    console.log("UpdateOne Failed :=== " + err);
  }
  finally
  {
  }

}

module.exports = UpdateOne;