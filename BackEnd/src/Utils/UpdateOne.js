const log = require("./log");

const UpdateOne = async (model, filter, fieldsToUpdate) => {

  try
  {
    const result = await model.updateOne(filter, fieldsToUpdate, {upsert: true})
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