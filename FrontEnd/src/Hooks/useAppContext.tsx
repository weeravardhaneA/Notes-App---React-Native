import { createContext, useContext, useState } from 'react';
import RNFS from "react-native-fs"
import { AppContextType, AppProviderProps, DataObjectType } from "../Types/Types"


const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({children}:AppProviderProps) => {

  // ==================================================
  // Declarations ==================================================

  const FolderPath = RNFS.DocumentDirectoryPath
  const AllNotesFilePath = FolderPath + "/AllNotes.json"
  const UnsyncedNotesFilePath = FolderPath + "/UnsyncedNotes.json"
  const ToDeleteFilePath = FolderPath + "/ToDelete.json"
  const ToUpdateFilePath = FolderPath + "/ToUpdate.json"

  const [ToDeleteFileExists, setToDeleteFileExists] = useState<boolean>(false)
  const [ToUpdateFileExists, setToUpdateFileExists] = useState<boolean>(false)

  const [ActiveScreen, setActiveScreen] = useState("auth")
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

  const [Error, setError] = useState<string>("")
  const [ShowVerifyModal, setShowVerifyModal] = useState<boolean>(false)


  // ==================================================
  // ==================================================

  // ==================================================
  // ==================================================



  return(

    <AppContext.Provider value={{

      FolderPath,
      AllNotesFilePath,
      UnsyncedNotesFilePath,
      ToDeleteFilePath,
      ToUpdateFilePath,
      ToDeleteFileExists,
      setToDeleteFileExists,
      ToUpdateFileExists,
      setToUpdateFileExists,
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
      Error,
      setError,
      ShowVerifyModal,
      setShowVerifyModal,

    }}>{children}</AppContext.Provider>
  )

}

export const useAppContext = () => {

  return useContext(AppContext)

}