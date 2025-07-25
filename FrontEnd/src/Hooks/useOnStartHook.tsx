import RNFS from "react-native-fs"
import { useAppContext } from "./useAppContext"


export const useOnStartHook = () => {
  
  // ==================================================
  // Declarations ==================================================

  const {AllNotesFilePath, UnsyncedNotesFilePath, setUnsyncedNotesExist, setAllNotes} = useAppContext();

  // ==================================================
  // ==================================================
  
  const ReadFile = async (filePath:string) => {
  
    const fileExist = await RNFS.exists(filePath)
  
    if(fileExist)
    {
      const fileContent = await RNFS.readFile(filePath)
      const data = JSON.parse(fileContent)
  
      return data;
    }
    else
    {
      return false;
    }
  }
  
  // ==================================================
  // ==================================================
  
  const SyncNotesFromStorage = async () => {
  
  
    // ==================================================
    // Reusable Functions ==================================================
  
    const fileExist = await RNFS.exists(UnsyncedNotesFilePath)
    
    if(fileExist)
    {
      setUnsyncedNotesExist(true)
    }
    else
    {
      setUnsyncedNotesExist(false)
    }
    
    // ==================================================
    // ==================================================
  
    // ==================================================
    // File System ==================================================
  
    try
    {
      const UnsyncedNotesFileExist = await RNFS.exists(UnsyncedNotesFilePath)
      const AllNotesFileExist = await RNFS.exists(AllNotesFilePath)
  
      if(UnsyncedNotesFileExist && AllNotesFileExist)
      {
        const AllNotesStat = await RNFS.stat(AllNotesFilePath)
        const UnsyncedNotesStat = await RNFS.stat(UnsyncedNotesFilePath)
  
        if(UnsyncedNotesStat.mtime > AllNotesStat.mtime)
        {
          const data = await ReadFile(UnsyncedNotesFilePath)
          setAllNotes(data)
        }
        else
        {
          const data = await ReadFile(AllNotesFilePath)
          if(data)
          {
            setAllNotes(data)
          }
          else
          {
            await RNFS.writeFile(AllNotesFilePath, JSON.stringify([]), "utf8")
            setAllNotes([])
          }
        }
      }
      else if(AllNotesFileExist && !UnsyncedNotesFileExist)
      {
    
        const data = await ReadFile(AllNotesFilePath)
        setAllNotes(data)
      }
      else if(!AllNotesFileExist && UnsyncedNotesFileExist)
      {
        const data = await ReadFile(UnsyncedNotesFilePath)
        setAllNotes(data)
      }
      else {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify([]), "utf8");
        setAllNotes([]);
      }
  
    }
    catch(err)
    {
      console.log(`File System Error : ${err}`)
    }
  
    // ==================================================
    // ==================================================

  }

  return{
    SyncNotesFromStorage
  }

}