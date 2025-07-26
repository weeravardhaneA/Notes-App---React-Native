import { createContext, useContext, useState } from 'react';
import RNFS from "react-native-fs"
import { AppContextType, AppProviderProps, DataObjectType } from "../Types/Types"
import { UpdateAllNotesAPI } from '../APIs/DatabaseAPIs';
import DeleteNotesAPI from '../APIs/DeleteNoteAPI';


const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({children}:AppProviderProps) => {

  // ==================================================
  // Declarations ==================================================

  const FolderPath = RNFS.DocumentDirectoryPath
  const AllNotesFilePath = FolderPath + "/AllNotes.json"
  const UnsyncedNotesFilePath = FolderPath + "/UnsyncedNotes.json"
  const ToDeleteFilePath = FolderPath + "/ToDelete.json"

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

  const UpdateData = async (data:DataObjectType[]) => {

    if(Connected)
    {
      const result = await UpdateAllNotesAPI(data)

      if(result === "success")
      {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify(data), "utf8")
      }
      else
      {
        await RNFS.writeFile(UnsyncedNotesFilePath, JSON.stringify(data), "utf8")
        setUnsyncedNotesExist(true)
      }
    }
    else
    {
      await RNFS.writeFile(UnsyncedNotesFilePath, JSON.stringify(data), "utf8")
      setUnsyncedNotesExist(true)
    }

    setAllNotes(data)

  }


  const DeleteData = async (removeArray:DataObjectType[], keepArray:DataObjectType[])=> {

    if(Connected)
    {
      const result = await DeleteNotesAPI(removeArray)

      if(result === "success")
      {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify(keepArray), "utf8")
      }
      else
      {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify(keepArray), "utf8")
        await RNFS.writeFile(ToDeleteFilePath, JSON.stringify(removeArray), "utf8")
        setUnsyncedNotesExist(true)
      }
    }
    else
    {
      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(keepArray), "utf8")
      await RNFS.writeFile(ToDeleteFilePath, JSON.stringify(removeArray), "utf8")
      setUnsyncedNotesExist(true)
    }

    setAllNotes(keepArray)

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