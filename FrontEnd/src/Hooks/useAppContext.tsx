import { createContext, useContext, useState } from 'react';
import RNFS from "react-native-fs"
import { AppContextType, AppProviderProps, DataObjectType } from "../Types/Types"
import { UpdateAllNotesAPI } from '../APIs/DatabaseAPIs';
import DeleteNotesAPI from '../APIs/DeleteNoteAPI';
import ReadFile from '../Helpers/ReadFile';
import log from '../Helpers/log';


const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({children}:AppProviderProps) => {

  // ==================================================
  // Declarations ==================================================

  const FolderPath = RNFS.DocumentDirectoryPath
  const AllNotesFilePath = FolderPath + "/AllNotes.json"
  const UnsyncedNotesFilePath = FolderPath + "/UnsyncedNotes.json"
  const ToDeleteFilePath = FolderPath + "/ToDelete.json"
  const ToUpdateFilePath = FolderPath + "/ToUpdate.json"

  const [ActiveScreen, setActiveScreen] = useState("home")
  const [NoteStatus, setNoteStatus] = useState("")

  const [ClickedId, setClickedId] = useState<number>()
  const [Title, setTitle] = useState("")
  const [Note, setNote] = useState("")

  const [SelectModeOn, setSelectModeOn] = useState<boolean>(false)
  const [SelectedItems, setSelectedItems] = useState<number[]>([])

  const [AllNotes, setAllNotes] = useState<DataObjectType[]>([

    {id: 1, title: "title 1", note: "text1"},
    {id: 2, title: "title 2", note: "text2"},
    {id: 3, title: "title 3", note: "text3"},

  ])

  const [ShowingNotes, setShowingNotes] = useState<DataObjectType[]>([])

  const [Connected, setConnected] = useState<boolean|null>(null)
  const [UnsyncedNotesExist, setUnsyncedNotesExist] = useState<boolean>(false)


  // ==================================================
  // ==================================================


  // ==================================================
  // Shared Functions ==================================================

  const UpdateData = async (updatedArray:DataObjectType[], updatedNote:DataObjectType[]) => {

    try
    {
      
      if(Connected)
      {
        const result = await UpdateAllNotesAPI(updatedArray)
  
        if(result === "success")
        {
          // no action needed 
        }
        else
        {
          const ToUpdateArray = await ReadFile(ToUpdateFilePath)
          const newToUpdateArray = [...ToUpdateArray, ...updatedNote]
          await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(newToUpdateArray), "utf8")
  
          setUnsyncedNotesExist(true)
        }
      }
      else
      {
        const ToUpdateArray = await ReadFile(ToUpdateFilePath)
        const newToUpdateArray = [...ToUpdateArray, ...updatedNote]
        await RNFS.writeFile(ToUpdateFilePath, JSON.stringify(newToUpdateArray), "utf8")
  
        setUnsyncedNotesExist(true)
      }
      
      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(updatedArray), "utf8")

      setAllNotes(updatedArray)
    }
    catch(err)
    {
      log("UpdateData failed:", err)
    }

  }


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
          setUnsyncedNotesExist(true)
        }
      }
      else
      {
        await RNFS.writeFile(ToDeleteFilePath, JSON.stringify(removeArray), "utf8")
        setUnsyncedNotesExist(true)
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



  return(

    <AppContext.Provider value={{

      FolderPath,
      AllNotesFilePath,
      UnsyncedNotesFilePath,
      ActiveScreen,
      setActiveScreen,
      NoteStatus,
      setNoteStatus,
      ClickedId,
      setClickedId,
      Title,
      setTitle,
      Note,
      setNote,
      SelectModeOn,
      setSelectModeOn,
      SelectedItems,
      setSelectedItems,
      AllNotes,
      setAllNotes,
      ShowingNotes,
      setShowingNotes,
      Connected,
      setConnected,
      UnsyncedNotesExist,
      setUnsyncedNotesExist,
      UpdateData,
      DeleteData,

    }}>{children}</AppContext.Provider>
  )

}

export const useAppContext = () => {

  return useContext(AppContext)

}