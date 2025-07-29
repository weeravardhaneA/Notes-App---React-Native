import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import c from "../Utils/Colors";

const ScreenWidth = Dimensions.get("window").width;

// ==================================================
// Types ==================================================

type props = {

  onPress:(id:number)=>void,
  onLongPress:(id:number)=>void,
  id:number,
  title:string,
  note:string,
  selected:boolean,
  
}

// ==================================================
// ==================================================


const NoteCard = (
  {
    onPress,
    onLongPress,
    id,
    title,
    note,
    selected,
  
  }:props

) => {


  return(

    <TouchableOpacity
      style={selected ? s.v1 : s.v2}
      onPress={()=>onPress(id)}
      onLongPress={()=>onLongPress(id)}
    >

      <Text style={s.t1}>{title}</Text>
      <Text style={s.t2}>{note}</Text>
    
    </TouchableOpacity>

  )
}

const s = StyleSheet.create({

  v1: {
    width: ScreenWidth * 0.43,
    minHeight: 140,
    backgroundColor: c.c14,
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 2,
    borderColor: c.c15,
    shadowColor: c.c16,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 7,
    justifyContent: "flex-start",
  },

  v2: {
    width: ScreenWidth * 0.43,
    minHeight: 140,
    backgroundColor: c.c17,
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: c.c18,
    shadowColor: c.c19,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    justifyContent: "flex-start",
  },

  t1: {
    fontSize: 21,
    fontWeight: "800",
    color: c.c12,
    marginBottom: 10,
    letterSpacing: 0.5,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: "top",
  },

  t2: {
    fontSize: 16,
    fontWeight: "500",
    color: c.c8,
    letterSpacing: 0.35,
    lineHeight: 26,
    includeFontPadding: false,
    textAlignVertical: "top",
  },
})

export default NoteCard;