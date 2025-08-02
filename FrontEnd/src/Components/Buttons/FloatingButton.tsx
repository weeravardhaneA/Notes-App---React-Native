import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import c from "../../Utils/Colors";
import { useState } from "react";
import log from "../../Utils/log";

// ==================================================
// Types ==================================================

type propsType = {
  
  text?:string,
  onPress?:()=>void,
  buttonStyle?:StyleProp<ViewStyle>,
  viewStyle?:StyleProp<ViewStyle>,
  textStyle?:StyleProp<TextStyle>,

}

// ==================================================
// ==================================================

const FloatingButton = (props:propsType) => {

  // ==================================================
  // Declarations ==================================================

  const {text, onPress, buttonStyle, viewStyle, textStyle, ...rest} = props;

  const [Loading, setLoading] = useState<boolean>(false)

  // ==================================================
  // ==================================================

  // ==================================================
  // onPress ==================================================

  const onButtonPress = async () => {

    setLoading(true)

    try
    {
      if(!onPress)
      {
        return;
      }

      await Promise.resolve(onPress());

    }
    catch(err)
    {
      log("DrawerButton onButtonPress failed")
    }
    finally
    {
      setLoading(false)
    }

  }

  // ==================================================
  // ==================================================

  return(

    <View style={[s.v1, viewStyle]}>

      {
        Loading ?
        
        <ActivityIndicator color="red" size="small"/>
    
        :

        <TouchableOpacity
          style={[s.b1, buttonStyle]}
          onPress={onButtonPress}
          {...rest}
        >

          <Text style={[s.t1, textStyle]}>{text}</Text>

        </TouchableOpacity>
      
      }

    </View>

  )

}

const s = StyleSheet.create({

  v1: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  
  b1: {
    borderRadius: 16,
    borderColor: c.c22,
    justifyContent: "center",
    alignItems: "center",
  },

  t1: {
    fontSize: 40,
    textAlign: "center"
  }
  
})

export default FloatingButton;