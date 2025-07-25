const InsertOne = async (collection, data) => {

  try
  {
    const result = await collection.create(data)
    return result
    
  }
  catch(err)
  {
    console.log("InsertOne Failed :=== " + err);
  }
  finally
  {
  }

}

module.exports = InsertOne;