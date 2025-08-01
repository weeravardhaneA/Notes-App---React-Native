const log = require("./log");
const bcrypt = require("bcrypt");

const BcryptHash = async (password) => {

  try
  {
    if(!password)
    {
      return false;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
  }
  catch(err)
  {
    log("BcryptHash failed :=== " + err);
    return false;
  }

}

module.exports = BcryptHash;