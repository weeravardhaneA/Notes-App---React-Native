import { API_URL } from "@env"
import axios from "axios"
import { DataObjectType } from "../Types/Types"
import log from "../Helpers/log"


// ==================================================
// ==================================================


const UpdateAllNotesAPI = async (DataArray:DataObjectType[]) => {

   try
  {
    const response = await axios.post(API_URL + "/update", {DataArray}, {timeout: 3000})

    const result = response.data

    log(result)

    if(response.status === 200 && result.message === "success")
    {
      return ("success")
    }
    else
    {
      return ("failed")
    }
  }
  catch(err)
  {
    log("Update Failed" , err)
    
    return ("failed")
  }
}

// ==================================================
// ==================================================

const GetAllNotesAPI = async () => {

  try
  {
    const response = await axios.get(API_URL + "/get-all-notes");
      
    const result = response.data

    log(result)
  }
  catch(err)
  {
    log("GetAllNotesAPI failed:", err);
  }

}

// ==================================================
// ==================================================

export {UpdateAllNotesAPI, GetAllNotesAPI}