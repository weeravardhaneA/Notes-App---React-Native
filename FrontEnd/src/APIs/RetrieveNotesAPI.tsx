import { API_URL } from "@env";
import axios from "axios";
import log from "../Helpers/log";

const RetrieveNotesAPI = async () => {

  try
  {
    const response = await axios.get(API_URL + "/notes/retrieve", {timeout: 3000})

    const result = response.data;

    log(result)

    if(response.status === 200 && result.message === "success")
    {
      return result.data;
    }
    else
    {
      return false;
    }
  }
  catch(err)
  {
    log("RetrieveNotesAPI Failed" , err)
    return false;
  }

}

export default RetrieveNotesAPI;