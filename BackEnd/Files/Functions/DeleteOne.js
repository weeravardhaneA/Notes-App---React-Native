const log = require("../Helpers/log");

const DeleteOne = async (collection, filter) => {

  try
  {
    const result = await collection.deleteOne(filter)
    log(result)
    return result;
  }
  catch(err)
  {
    log("DeleteOne Failed :=== " + err);
    throw err;
  }

}

module.exports = DeleteOne;