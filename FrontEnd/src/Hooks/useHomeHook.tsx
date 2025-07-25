import { DataObjectType } from "../Types/Types";
import { useAppContext } from "./useAppContext"

export const useHomeHook = () => {

  // ==================================================
  // Declarations ==================================================
  
  const {SelectedItems, setSelectModeOn, setSelectedItems, AllNotes, UpdateData, SelectModeOn, setClickedId, ShowingNotes, setActiveScreen, setNoteStatus, setTitle, setNote, setShowingNotes} = useAppContext();

  // ==================================================
  // ==================================================
  
  
  // ==================================================
  // ==================================================
  
  const CheckSelected = (id: number) => {
    
    const result = SelectedItems.includes(id)
  
    return result
  
  }

  // ==================================================
  // ==================================================
  
  const AddToSelectedItems = (id: number) => {
  
    if(SelectedItems.length <= 0)
    {
      setSelectModeOn(true)
    }
  
    const newArray = [...SelectedItems, id]
  
    setSelectedItems(newArray)
  
  }

  // ==================================================
  // ==================================================

  const RemoveFromSelectedItems = (id: number) => {

    const newArray = SelectedItems.filter((item:number) => {
  
      if(item != id)
      {
        return item
      }
  
    })
  
    setSelectedItems(newArray)
  
    if(newArray.length <= 0)
    {
      setSelectModeOn(false)
    }
  
  }

  // ==================================================
  // ==================================================

  const onDeletePress = async () => {
    
    const newArray = AllNotes.filter((item) => {

      if(!SelectedItems.includes(item.id))
      {
        return item
      }

    })

    await UpdateData(newArray)
    setSelectedItems([])
    setSelectModeOn(false)

  }

  // ==================================================
  // ==================================================

  const onNotePress = (id:number) => {
      
    if(SelectModeOn)
    {

      if(CheckSelected(id))
      {
        RemoveFromSelectedItems(id)
      }
      else
      {
        AddToSelectedItems(id)
      }

    }
    else
    {
  
      setClickedId(id);
      const ClickedItem = ShowingNotes.find((item: DataObjectType)=>item.id==id)
    
      setActiveScreen("note")
      setNoteStatus("update")
    
      if(ClickedItem)
      {
        setTitle(ClickedItem.title)
        setNote(ClickedItem.note)
      }
    }
  
  }

  // ==================================================
  // ==================================================

  const onNoteLongPress = (id: number) => {

    if(CheckSelected(id))
    {
      RemoveFromSelectedItems(id)
    }
    else
    {
      AddToSelectedItems(id)
    }
  }

  // ==================================================
  // ==================================================

  const onPlusPress = () => {

    setActiveScreen("note")
    setNoteStatus("insert")
    
  }

  // ==================================================
  // ==================================================

  const onSearchTextChange = (filteredArray: DataObjectType[]) => {

    setShowingNotes(filteredArray)

  }

  // ==================================================
  // ==================================================

  return{
    CheckSelected,
    AddToSelectedItems,
    RemoveFromSelectedItems,
    onDeletePress,
    onNotePress,
    onPlusPress,
    onNoteLongPress,
    onSearchTextChange,
  }
}