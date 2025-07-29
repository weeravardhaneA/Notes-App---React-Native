import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native"
import c from "../Utils/Colors";

const LoadingScreen = () => {

  return(

    <SafeAreaView style={s.sav1}>

      <View style={s.v1}>
      
        <Text style={s.t1}>Loading</Text>

        <ActivityIndicator size="large" color="#d02c2cff"/>

      </View>

    </SafeAreaView>

  )

}

const s = StyleSheet.create({

  sav1: {
    flex: 1,
    backgroundColor: c.c17
  },

  v1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  t1: {
    fontSize: 30,
    fontWeight: "800",
    color: c.c24,
    marginBottom: 20
  }

})

export default LoadingScreen;