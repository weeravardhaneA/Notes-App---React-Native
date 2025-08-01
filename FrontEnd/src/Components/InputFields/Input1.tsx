// Input.tsx
import React from "react";
import { TextInput, StyleSheet, StyleProp, TextStyle, TextInputProps } from "react-native";

type Props = TextInputProps & {

  inputStyle?: StyleProp<TextStyle>;
  variant?: "green" | "brown";
  onChangeText?:(value:string)=>void,
  secureTextEntry?:boolean
  
};

const Input1 = (
  {
    inputStyle,
    variant = "brown",
    onChangeText,
    secureTextEntry,
    ...rest
  
  }: Props
  
  ) => {

  return(

    <TextInput
      style={[s.i1, variant === "green" ? s.green : s.brown, inputStyle]}
      placeholderTextColor={variant === "green" ? "#065f46" : "#7c2d12"}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

const s = StyleSheet.create({
  i1: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  green: {
    backgroundColor: "#ecfdf5",
    borderColor: "#10b981",
    color: "#064e3b",
  },
  brown: {
    backgroundColor: "#fff7ed",
    borderColor: "#fcd5ce",
    color: "#7c2d12",
  },
});

export default Input1;
