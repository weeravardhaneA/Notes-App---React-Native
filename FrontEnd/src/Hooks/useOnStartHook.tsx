import RNFS from "react-native-fs"
import { useAppContext } from "./useAppContext"
import ReadFile from "../Utils/ReadFile";
import DeleteNotesAPI from "../APIs/DeleteNotesAPI";
import UpdateNotesAPI from "../APIs/UpdateNotesAPI";
import log from "../Utils/log";
import RetrieveNotesAPI from "../APIs/RetrieveNotesAPI";


export const useOnStartHook = () => {
  
  // ==================================================
  // Declarations ==================================================

  const {AllNotesFilePath, setAllNotes, ToDeleteFilePath, ToUpdateFilePath, setToDeleteFileExists, setToUpdateFileExists, Connected} = useAppContext();

  // ==================================================
  // ==================================================

  
  // ==================================================
  // ==================================================
  
  const SyncNotesFromStorage = async () => {

    try
    {
      const NotesArray = await ReadFile(AllNotesFilePath)

      if(NotesArray)
      {
        setAllNotes(NotesArray)
        return;
      }
      
      if(!Connected)
      {
        setAllNotes([])
        return;
      }

      const result = await RetrieveNotesAPI();

      if(Array.isArray(result))
      {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify(result), "utf8")
        setAllNotes(result)
      }
      else
      {
        setAllNotes([])
      }

    }
    catch(err)
    {
      console.log("File System Error", err)
    }

  }

  // ==================================================
  // ==================================================

  const SyncPendingChanges  = async () => {

    try
    {
      const ToDeleteArray = await ReadFile(ToDeleteFilePath)
      const ToUpdateArray = await ReadFile(ToUpdateFilePath)

      if(Connected)
      {

        if(ToUpdateArray)
        {
          const result = await UpdateNotesAPI(ToUpdateArray)
    
          if(result)
          {
            await RNFS.unlink(ToUpdateFilePath)
            setToUpdateFileExists(false)
          }
          else
          {
            setToUpdateFileExists(true)
          }
        }
        
        if(ToDeleteArray)
        {
          const result = await DeleteNotesAPI(ToDeleteArray)
    
          if(result)
          {
            await RNFS.unlink(ToDeleteFilePath)
            setToDeleteFileExists(false)
          }
          else
          {
            setToDeleteFileExists(true)
          }
        }
    
      }
      else
      {
        if(ToDeleteArray) {setToDeleteFileExists(true)}
        if(ToUpdateArray) {setToUpdateFileExists(true)}
      }

    }
    catch(err)
    {
      log("SyncToDeleteAndToUpdate failed", err)
    }

  }

  // ==================================================
  // ==================================================


  return{
    SyncNotesFromStorage,
    SyncPendingChanges,
  }

}