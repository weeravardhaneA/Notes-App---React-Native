import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
const ScreenWidth = Dimensions.get("window").width;

// ==================================================
// Types ==================================================

type props = {

  onPress:()=>void,

}

// ==================================================
// ==================================================


const SaveButton = (
  {
    onPress,

  }:props
  
) => {

  return(

    <TouchableOpacity
      style={s.b1}
      onPress={onPress}
    >
    
      <Text style={s.t1}>Save</Text>
    
    </TouchableOpacity>

  )

}

const s = StyleSheet.create({

  b1: {
    width: ScreenWidth * 0.4,
    height: "75%",
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ea580c",
    borderColor: "#ea580c",
    shadowColor: "#ea580c",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
  },

  t1: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 17,
    letterSpacing: 0.8,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
})

export default SaveButton;