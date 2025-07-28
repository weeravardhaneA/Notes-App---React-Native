const log = require("./log");

const UpdateOne = async (collection, filter, fieldsToUpdate) => {

  try
  {
    const result = await collection.updateOne(filter, fieldsToUpdate, {upsert: true})
    log(result);
    return result;
  }
  catch(err)
  {
    log("UpdateOne Failed :=== " + err);
    throw err;
  }

}

module.exports = UpdateOne;