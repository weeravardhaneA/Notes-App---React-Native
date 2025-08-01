// Label.tsx
import React, { useState } from "react";
import { Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableOpacity, ActivityIndicator } from "react-native";
import log from "../../Utils/log";

// ==================================================
// Types ==================================================

type Props = {

  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress:()=>void,
  disabled?:boolean,

};

// ==================================================
// ==================================================

const Button1 = (
  {
    text,
    buttonStyle,
    textStyle,
    onPress,
    ...rest
  
  }: Props

) => {

  // ==================================================
  // Declarations ==================================================

  const [Loading, setLoading] = useState<boolean>(false)

  // ==================================================
  // onPress ==================================================

  const onButtonPress = async () => {

    setLoading(true)

    try
    {
      await Promise.resolve(onPress());
    }
    catch(err)
    {
      log("Button1 onButtonPress failed")
    }
    finally
    {
      setLoading(false)
    }

  }

  // ==================================================
  // ==================================================
  
  return (

    <View style={s.v1}>
      
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
  
  );
  
};

const s = StyleSheet.create({
  
  v1: {
    justifyContent: "center",
    alignItems: "center",
  },
  
  b1: {
    backgroundColor: "#fff7ed",
    borderColor: "#fcd5ce",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  t1: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.4,
    color: "#7c2d12",
  },

});

export default Button1;
