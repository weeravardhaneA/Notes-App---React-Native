const log = require("./log");

const InsertOne = async (model, newDoc) => {

  try
  {
    if(!model || !newDoc)
    {
      return false;
    }

    const result = await model.create(newDoc)
    return result;
  }
  catch(err)
  {
    log("InsertOne failed :=== " + err);
    return false;
  }

}

module.exports = InsertOne;