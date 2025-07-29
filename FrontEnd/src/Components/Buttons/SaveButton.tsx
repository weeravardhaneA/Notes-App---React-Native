import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import c from "../../Utils/Colors";
const ScreenWidth = Dimensions.get("window").width;

// ==================================================
// Types ==================================================

type props = {

  onPress:()=>void,
  disabled?:boolean

}

// ==================================================
// ==================================================


const SaveButton = (
  {
    onPress,
    disabled = false,

  }:props
  
) => {

  return(

    <TouchableOpacity
      style={[s.b1, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      disabled={disabled}
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
    backgroundColor: c.c7,
    borderColor: c.c7,
    shadowColor: c.c7,
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