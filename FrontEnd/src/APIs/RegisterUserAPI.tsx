import { API_URL } from "@env";
import axios from "axios";
import log from "../Utils/log";

const RegisterUserAPI = async (email:string, password:string) => {

  try
  {
    const response = await axios.post(API_URL + "/user/register", {
      
      email, password
    
    },{
  
      headers: {"Content-Type": "application/json"},
      timeout: 10000
  
    })
  
    const result = response.data;
    log(result)

    if(response.status === 200 && result?.message === "success")
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
    log("RegisterUserAPI failed", err)
    return false;
  }
  
}

export default RegisterUserAPI;