import { StyleSheet, Text, View } from "react-native";
import c from "../Utils/Colors";
import { useAppContext } from "../Hooks/useAppContext";


const ErrorBar = () => {

  // ==================================================
  // Declarations ==================================================

  const {Error} = useAppContext();

  // ==================================================
  // ==================================================

  return(
  
    <View style={s.v1}>
  
      { Error ? <Text style={s.t1}>⚠️ {Error} ⚠️</Text> : null }
  
    </View>
  
  )

}

const s = StyleSheet.create({

  v1: {
    maxWidth: "80%",
    backgroundColor: c.c6,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7
  },
  
  t1: {
    fontSize: 10,
    fontWeight: "800",
    color: c.c5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: c.c5,
    borderRadius: 20,
    textAlign: "center"
  }

})

export default ErrorBar;