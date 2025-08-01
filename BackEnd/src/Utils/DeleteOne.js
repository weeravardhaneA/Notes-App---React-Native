const log = require("./log");

const DeleteOne = async (model, filter) => {

  try
  {
    if(!model || !filter)
    {
      return false;
    }
    
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