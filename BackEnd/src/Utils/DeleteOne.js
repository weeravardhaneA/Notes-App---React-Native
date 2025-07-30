const log = require("./log");

const DeleteOne = async (model, filter) => {

  try
  {
    const result = await model.deleteOne(filter)
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