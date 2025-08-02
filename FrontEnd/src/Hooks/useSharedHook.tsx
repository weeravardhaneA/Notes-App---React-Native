import DeleteNotesAPI from "../APIs/DeleteNotesAPI";
import UpdateNotesAPI from "../APIs/UpdateNotesAPI";
import log from "../Utils/log";
import ReadFile from "../Utils/ReadFile";
import { DataObjectType } from "../Types/Types"
import { useAppContext } from "./useAppContext"
import RNFS from "react-native-fs"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const result = await UpdateNotesAPI(updatedNote)
  
        if(result)
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
  
        if(result)
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

  const SaveToken = async (token:string) => {

    try
    {
      await AsyncStorage.setItem("token", token)
      return true;
    }
    catch(err)
    {
      log("SaveToken failed : ", err)
      return false;
    }
  }

  // ==================================================
  // ==================================================

  const RetrieveToken = async (token:string) => {

    try
    {
      const result = await AsyncStorage.getItem(token)
      return result;
    }
    catch(err)
    {
      log("RetrieveToken failed : ", err)
      return false;
    }
  }

  // ==================================================
  // ==================================================

  // ==================================================
  // ==================================================

  return{
    UpdateData,
    DeleteData,
    SaveToken,
    RetrieveToken,
  }
}