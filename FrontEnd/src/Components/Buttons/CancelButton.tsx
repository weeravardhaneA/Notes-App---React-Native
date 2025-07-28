import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
const ScreenWidth = Dimensions.get("window").width;

// ==================================================
// Types ==================================================

type props = {

  onPress:()=>void

}

// ==================================================
// ==================================================


const CancelButton = (
  {
    onPress,

  }:props

) => {

  return(

    <TouchableOpacity
      style={s.b1}
      onPress={onPress}
    >
      
      <Text>Cancel</Text>
          
    </TouchableOpacity>

  )

}

const s = StyleSheet.create({

  b1: {
    width: ScreenWidth * 0.4,
    height: "75%",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

})

export default CancelButton;