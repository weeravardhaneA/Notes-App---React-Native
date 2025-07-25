import { useAppContext } from "./useAppContext"

export const useNoteHook = () => {

  // ==================================================
  // Declarations ==================================================

  const {setActiveScreen, setNoteStatus, setTitle, setNote, NoteStatus, ClickedId, AllNotes, Title, Note, UpdateData} = useAppContext()

  // ==================================================
  // ==================================================

  const onCancelPress = () => {
    
    setActiveScreen("home")
    setNoteStatus("")
    setTitle("")
    setNote("")
    
  }

  // ==================================================
  // ==================================================
    
  const onSavePress = async () => {
    
    if(NoteStatus=="update" && ClickedId)
    {
      const newArray = AllNotes.map((item)=>{
    
        if(item.id==ClickedId)
        {
          return {...item, title: Title, note: Note}
        }
        return item
      })
    
      await UpdateData(newArray)
    
    }
    else if(NoteStatus=="insert")
    {
      let newId;
      if(AllNotes.length < 1)
      {
        newId = 1
      }
      else
      {
        newId = AllNotes[AllNotes.length-1].id+1
      }

      const newArray = [...AllNotes, {id: newId, title: Title, note: Note}]
    
      await UpdateData(newArray)
    }
    
    setActiveScreen("home")
    setNoteStatus("")
    setTitle("")
    setNote("")
  }

  // ==================================================
  // ==================================================

  return{
    onCancelPress,
    onSavePress,
  }
}