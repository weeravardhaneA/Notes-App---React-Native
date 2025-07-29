import { StyleSheet, Text, TouchableOpacity } from "react-native"
import c from "../../Utils/Colors"

// ==================================================
// Types ==================================================

type props = {

  onPress:()=>void

}

// ==================================================
// ==================================================

const AddButton = (
  {
    onPress

  }:props

) => {

  return(

    <TouchableOpacity
      onPress={onPress}
    >
      <Text style={s.t1}>+</Text>
    </TouchableOpacity>

  )

}

const s = StyleSheet.create({

  t1: {
    fontSize: 38,
    fontWeight: "900",
    color: c.c1,
    textShadowColor: c.c2,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
})

export default AddButton;