import { API_URL } from "@env"
import { DataObjectType } from "../Types/Types"
import axios from "axios"
import log from "../Utils/log"

const UpdateNotesAPI = async (DataArray:DataObjectType[]) => {

   try
  {
    const response = await axios.post(API_URL + "/notes/update", {DataArray}, {timeout: 3000})

    const result = response.data

    log(result)

    if(response.status === 200 && result.message === "success")
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
    log("UpdateNotesAPI Failed" , err)
    
    return false;
  }
}

export default UpdateNotesAPI;