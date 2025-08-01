import axios from "axios";
import log from "../Utils/log"
import { API_URL } from "@env";

const VerifyOtpAPI = async (email:string, otp:string) => {

  try
  {
    const response = await axios.post(API_URL + "/verify/otp", {
      
      email, otp
    
    },{

      headers: {"Content-Type": "application/json"},
      withCredentials: true,
      timeout: 3000
    })

    const result = response.data;
    log(result)

    if(response.status === 200 && result?.message==="success")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  catch(err)
  {
    log("VerifyOtpAPI failed : ", err)
    return false;
  }

}

export default VerifyOtpAPI;