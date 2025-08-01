const log = require("./log");

const OtpGenerator = () => {

  try
  {
    const max = 999999;
    const min = 100000;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString();
  }
  catch(err)
  {
    log("OtpGenerator failed :=== " + err);
    return false;
  }

}

module.exports = OtpGenerator;