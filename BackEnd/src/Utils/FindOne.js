const log = require("./log")

const FindOne = async (model, filter) => {

  try
  {
    if(!model || !filter)
    {
      return false;
    }

    const result = await model.findOne(filter).lean();
    return result;
  }
  catch(err)
  {
    log("FindOne failed :=== " + err);
    return false;
  }

}

module.exports = FindOne;