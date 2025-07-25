import { StyleSheet, Text, View } from "react-native";

// ==================================================
// Types ==================================================

type props = {

  title:string

}

// ==================================================
// ==================================================


const NotePageHeader = (
  {
    title
  
  }:props

) => {

  return(

    <View style={s.v1}>
      
      <Text>{title}</Text>
    
    </View>

  )

}

const s = StyleSheet.create({

  v1: {
    paddingVertical: 18,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#fcd5ce",
    backgroundColor: "#ffedd5",
  },
})

export default NotePageHeader;