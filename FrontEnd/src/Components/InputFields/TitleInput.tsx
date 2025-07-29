import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import c from "../../Utils/Colors";

// ==================================================
// Types ==================================================

type props = {
  
  value:string,
  onChangeText:(value:string)=>void,
}

// ==================================================
// ==================================================


const TitleInput = (
  {
    value,
    onChangeText,

  }:props

) => {

  return(

    <View>
            
      <TextInput
        style={s.i1}
        placeholder="Title"
        value={value}
        onChangeText={onChangeText}
        multiline={true}
      ></TextInput>
    
    </View>

  )

}

const s = StyleSheet.create({

  i1: {
    fontWeight: "800",
    fontSize: 32,
    color: c.c12,
    paddingBottom: 14,
    borderBottomWidth: 3,
    borderBottomColor: c.c13,
    letterSpacing: 0.7,
    lineHeight: 40,
    includeFontPadding: false,
    textAlignVertical: "top",
  },
})

export default TitleInput;