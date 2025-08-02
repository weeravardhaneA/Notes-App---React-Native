const log = require("./log")
const jwt = require("jsonwebtoken")

const JwtGenerator = (data) => {

  try
  {
    if(!data || !process.env.JWT_TOKEN_KEY)
    {
      return false;
    }

    const token = jwt.sign(data, process.env.JWT_TOKEN_KEY)
    return token;
  }
  catch(err)
  {
    log("JwtGenerator failed :=== " + err);
    return false;
  }

}

module.exports = JwtGenerator;