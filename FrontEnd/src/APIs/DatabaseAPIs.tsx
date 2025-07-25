import { API_URL } from "@env"
import axios from "axios"
import { DataObjectType } from "../Types/Types"


// ==================================================
// ==================================================


const UpdateAllNotesAPI = async (DataArray:DataObjectType[]) => {

   try
  {
    const response = await axios.post(API_URL + "/update", {DataArray})

    const result = response.data

    console.log(result)
  }
  catch(err)
  {
  }
}

// ==================================================
// ==================================================

const GetAllNotesAPI = async () => {

  try
  {
    const response = await axios.get(API_URL + "/get-all-notes");
      
    const result = response.data

    console.log(result)
  }
  catch(err)
  {
    console.error("GetAllNotesAPI failed:", err);
  }

}

// ==================================================
// ==================================================

export {UpdateAllNotesAPI, GetAllNotesAPI}