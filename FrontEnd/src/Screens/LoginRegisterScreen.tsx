import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Input1 from "../Components/InputFields/Input1"
import c from "../Utils/Colors";
import Button1 from "../Components/Buttons/Button1";
import { useLoginRegisterHook } from "../Hooks/useLoginRegisterHook"
import ErrorBar from "../Components/ErrorBar";
import { useAppContext } from "../Hooks/useAppContext";
import VerifyModal from "../Components/VerifyModal";

const LoginRegisterScreen = () => {

  // ==================================================
  // Declarations ==================================================

  const {ActiveTab, OnLoginTabPress, OnRegisterTabPress, setEmail, setPassword, setConfirmPassword, OnLoginButtonPress, OnRegisterButtonPress, onConfirmPress} = useLoginRegisterHook();

  // ==================================================
  // ==================================================


  // ==================================================
  // ==================================================

  return(


    <SafeAreaView style={s.sav1}>

      <View style={s.v1}>

        <View style={s.v2}>

          <View style={s.v3}>
            
            <Button1
              text="LogIn"
              buttonStyle={{width: 80, height: 50, opacity: ActiveTab==="login" ? 1 : 0.5}}
              onPress={OnLoginTabPress}
            />
            
            <Button1
              text="Register"
              buttonStyle={{width: 80, height: 50, opacity: ActiveTab==="login" ? 0.5 : 1}}
              onPress={OnRegisterTabPress}
            />

          </View>

          <View style={s.v4}>

            <ErrorBar/>

          </View>

          {
            ActiveTab==="login" ? 
          
            <View style={s.v5}>
            
              <Input1
                placeholder="Email"
                inputStyle={{width: 200}}
                onChangeText={setEmail}
              />
              <Input1
                placeholder="Password"
                inputStyle={{width: 200}}
                onChangeText={setPassword}
                secureTextEntry={true}
              />

            </View>

            :

            <View style={s.v5}>
            
              <Input1
                placeholder="Email"
                inputStyle={{width: 200}}
                onChangeText={setEmail}
              />
              <Input1
                placeholder="Password"
                inputStyle={{width: 200}}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <Input1
                placeholder="Confirm Password"
                inputStyle={{width: 200}}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                />

            </View>

          }


          <View style={s.v6}>

            {
              ActiveTab==="login" ?

              <Button1
                text={"Log In"}
                buttonStyle={{width: 100, height: 40, marginVertical: 5}}
                onPress={OnLoginButtonPress}
              />

              :
              
              <Button1
                text={"Register"}
                buttonStyle={{width: 100, height: 40, marginVertical: 5}}
                onPress={OnRegisterButtonPress}
              />
            }

          </View>

        </View>


      </View>

      <VerifyModal onPress={onConfirmPress}/>

    </SafeAreaView>

  )

}

const s = StyleSheet.create({

  sav1: {
    flex: 1,
    backgroundColor: c.c25
  },

  v1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  v2: {
    width: 300,
    height: 450,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 15,
    borderColor: c.c6,
    backgroundColor: c.c26,
    elevation: 12,
    shadowColor: c.c5
  },

  v3: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    // borderWidth: 2
  },

  v4: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2
  },

  v5: {
    width: "100%",
    height: 200,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 2
  },
  
  v6: {
    width: "100%",
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2
  }

})

export default LoginRegisterScreen;