import { SafeAreaView, StyleSheet, View } from "react-native";
import NotePageHeader from "../Components/NotePageHeader";
import TitleInput from "../Components/InputFields/TitleInput";
import NoteInput from "../Components/InputFields/NoteInput";
import CancelButton from "../Components/Buttons/CancelButton";
import SaveButton from "../Components/Buttons/SaveButton";
import { useNoteHook } from "../Hooks/useNoteHook";
import { useAppContext } from "../Hooks/useAppContext";

const NoteScreen = () => {

  // ==================================================
  // Declarations ==================================================

  const {Title, setTitle, Note, setNote,} = useAppContext()

  const {onCancelPress, onSavePress} = useNoteHook();

  // ==================================================
  // ==================================================
  
  return(

    <SafeAreaView style={s.sav1}>
        
      <NotePageHeader title={"Note Page"}/>

      <View style={s.v1}>

        <TitleInput value={Title} onChangeText={setTitle}/>
        <NoteInput value={Note} onChangeText={setNote}/>

      </View>

      <View style={s.v2}>

        <CancelButton onPress={onCancelPress}/>
        <SaveButton onPress={onSavePress} disabled={!Title.trim()}/>

      </View>

    </SafeAreaView>

  )

}

const s = StyleSheet.create({

  sav1: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },

  v1: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  v2: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#fde68a",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fef3c7",
  },
})

export default NoteScreen;