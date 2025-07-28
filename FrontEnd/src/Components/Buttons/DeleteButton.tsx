import { StyleSheet, Text, TouchableOpacity } from "react-native";

// ==================================================
// Types ==================================================

type props = {

  onPress:()=>void,
  
}

// ==================================================
// ==================================================

const DeleteButton = (
  {
    onPress,

  }:props

) => {

  return(

    <TouchableOpacity
      onPress={onPress}
    >
                
      <Text style={s.b1}>🗑️</Text>

    </TouchableOpacity>

  )

}

const s = StyleSheet.create({

  b1: {
    fontSize: 27,
    fontWeight: "900",
    color: "#dc2626",
    textShadowColor: "#fecaca",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    textAlign: "center",
  },
})

export default DeleteButton;