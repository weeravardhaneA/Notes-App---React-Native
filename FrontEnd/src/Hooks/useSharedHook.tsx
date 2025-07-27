import DeleteNotesAPI from "../APIs/DeleteNoteAPI";
import UpdateNotesAPI from "../APIs/UpdateNotesAPI";
import log from "../Helpers/log";
import ReadFile from "../Helpers/ReadFile";
import { DataObjectType } from "../Types/Types"
import { useAppContext } from "./useAppContext"
import RNFS from "react-native-fs"

export const useSharedHook = () => {

  // ==================================================
  // Declarations ==================================================

  const {Connected, ToUpdateFilePath, AllNotesFilePath, setAllNotes, ToDeleteFilePath, setToUpdateFileExists, setToDeleteFileExists} = useAppContext();

  // ==================================================
  // ==================================================

  const UpdateData = async (updatedArray:DataObjectType[], updatedNote:DataObjectType[]) => {

    try
    {
      
      if(Connected)
      {
        const result = await UpdateNotesAPI(updatedArray)
  
        if(result === "success")
        {
          // no action needed 
        }
        else
        {
          const ToUpdateArray = await ReadFile(ToUpdateFilePath)

          if(ToUpdateArray)
          {
            const newToUpdateArray = [...ToUpdateArray, ...updatedNote]
            await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(newToUpdateArray), "utf8")
          }
          else
          {
            await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(updatedNote), "utf8")
          }
  
          setToUpdateFileExists(true)
        }
      }
      else
      {
        const ToUpdateArray = await ReadFile(ToUpdateFilePath)

        if(ToUpdateArray)
        {
          const newToUpdateArray = [...ToUpdateArray, ...updatedNote]
          await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(newToUpdateArray), "utf8")
        }
        else
        {
          await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(updatedNote), "utf8")
        }
  
        setToUpdateFileExists(true)
      }
      
      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(updatedArray), "utf8")

      setAllNotes(updatedArray)
    }
    catch(err)
    {
      log("UpdateData failed:", err)
    }

  }

  // ==================================================
  // ==================================================

  const DeleteData = async (removeArray:DataObjectType[], keepArray:DataObjectType[])=> {

    try
    {
      if(Connected)
      {
        const result = await DeleteNotesAPI(removeArray)
  
        if(result === "success")
        {
          // no action needed
        }
        else
        {
          await RNFS.writeFile(ToDeleteFilePath, JSON.stringify(removeArray), "utf8")
          setToDeleteFileExists(true)
        }
      }
      else
      {
        await RNFS.writeFile(ToDeleteFilePath, JSON.stringify(removeArray), "utf8")
        setToDeleteFileExists(true)
      }
  
      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(keepArray), "utf8")
  
      setAllNotes(keepArray)
    }
    catch(err)
    {
      log("DeleteData failed", err)
    }

  }

  // ==================================================
  // ==================================================

  return{
    UpdateData,
    DeleteData
  }
}