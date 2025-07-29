import { StyleSheet, Text, View } from "react-native";
import c from "../Utils/Colors";

// ==================================================
// Types ==================================================

type props = {

  text:string,

}

// ==================================================
// ==================================================

const ErrorBar = (
  {
    text,

  }:props

) => {

  return(

    <View style={s.v1}>

      <Text style={s.t1}>{text}</Text>

    </View>

  )

}

const s = StyleSheet.create({

  v1: {
    backgroundColor: c.c6
  },
  
  t1: {
    fontSize: 10,
    fontWeight: "800",
    color: c.c5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.c5,
    borderRadius: 20,
  }

})

export default ErrorBar;