const log = require("../Helpers/log");

const RetrieveAll = async (collection) => {

  try
  {
    const result = await collection.find().lean();
    return result;
  }
  catch(err)
  {
    log("RetrieveAll Error :=== " + err);
  }

}

module.exports = RetrieveAll;