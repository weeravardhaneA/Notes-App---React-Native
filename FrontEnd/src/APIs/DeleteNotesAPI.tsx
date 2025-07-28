import { API_URL } from "@env"
import axios from "axios"
import { DataObjectType } from "../Types/Types"
import log from "../Helpers/log"

const DeleteNotesAPI = async (DataArray:DataObjectType[]) => {

  try
  {
    const response = await axios.post(API_URL + "/notes/delete", {DataArray}, {timeout: 3000})

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
    log("DeleteNotesAPI Failed" , err)
    return false;
  }
}

export default DeleteNotesAPI;