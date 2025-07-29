import { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import c from "../../Utils/Colors";

// ==================================================
// Types ==================================================

type props = {
  
  value:string,
  onChangeText:(value:string)=>void,
}

// ==================================================
// ==================================================


const NoteInput = (
  {
    value,
    onChangeText,
  
  }:props

) => {

  return(

    <ScrollView>
            
      <TextInput
        style={s.i1}
        placeholder="Note"
        value={value}
        onChangeText={onChangeText}
        multiline={true}
      ></TextInput>
    
    </ScrollView>

  )

}

const s = StyleSheet.create({

  i1: {
    fontWeight: "500",
    fontSize: 20,
    color: c.c8,
    paddingTop: 22,
    lineHeight: 36,
    letterSpacing: 0.4,
    includeFontPadding: false,
    textAlignVertical: "top",
    minHeight: 220,
  },
})

export default NoteInput;