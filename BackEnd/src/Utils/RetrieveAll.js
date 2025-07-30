const log = require("./log");

const RetrieveAll = async (model) => {

  try
  {
    const result = await model.find().lean();
    return result;
  }
  catch(err)
  {
    log("RetrieveAll Error :=== " + err);
  }

}

module.exports = RetrieveAll;