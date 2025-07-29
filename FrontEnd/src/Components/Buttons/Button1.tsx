// Label.tsx
import React from "react";
import { Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from "react-native";

// ==================================================
// Types ==================================================

type Props = {

  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?:()=>void

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
  
  return (

    <TouchableOpacity
      style={[s.b1, buttonStyle]}
      onPress={onPress}
      {...rest}
    >
    
      <Text style={[s.t1, textStyle]}>{text}</Text>
    
    </TouchableOpacity>
  
  );
  
};

const s = StyleSheet.create({
  
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
