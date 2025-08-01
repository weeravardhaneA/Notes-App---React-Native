import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native"
import { useAppContext } from "../Hooks/useAppContext"
import c from "../Utils/Colors";
import Input1 from "./InputFields/Input1";
import Button1 from "./Buttons/Button1";
import { useState } from "react";
import ErrorBar from "./ErrorBar";

// ==================================================
// Types ==================================================

type props = {

  onPress:(value:string)=>void,

}

// ==================================================
// ==================================================

const VerifyModal = ({onPress}:props) => {

  // ==================================================
  // Declarations ==================================================

  const {ShowVerifyModal, setShowVerifyModal} = useAppContext();

  const [DigitsArray, setDigitsArray] = useState<number[]>([])

  // ==================================================
  // ==================================================

  const onChangeText = (text:number, index:number) => {

    setDigitsArray(item => {

      const newArray = [...item];
      newArray[index-1] = text;
      return newArray;
    
    })

  }

  // ==================================================
  // ==================================================

  return(

    <Modal
      animationType="slide"
      visible={ShowVerifyModal}
      transparent={true}
      onRequestClose={() => setShowVerifyModal(false)}
    >

      <View style={s.v1}>

        <View style={s.v2}>

          <View style={s.v3}>

            <View style={s.v4}>
              <Text style={s.t1}>OTP has been sent to your email. Please verify to complete registration.</Text>
            </View>

            <View style={s.v5}>
              <ErrorBar/>
            </View>

            <View style={s.v6}>
              <Input1 
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 1)}
              />
              <Input1
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 2)}
              />
              <Input1
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 3)}
              />
              <Input1
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 4)}
              />
              <Input1
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 5)}
              />
              <Input1
                inputStyle={{width: 30, height: 40}}
                keyboardType="numeric" maxLength={1}
                onChangeText={(text)=>onChangeText(parseInt(text), 6)}
              />
            </View>

            <View style={s.v7}>
              <Button1
                text="Confirm"
                buttonStyle={{width: 150, height: 30, opacity: DigitsArray.length !== 6 ? 0.5 : 1}}
                onPress={()=>onPress(DigitsArray.join(""))}
                disabled={DigitsArray.length !== 6}
              />
            </View>

          </View>

        </View>

      </View>

    </Modal>
  )

}

const s = StyleSheet.create({

  v1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: c.c27,
  },

  v2: {
    width: 280,
    height: 300,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: c.c12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: c.c17,
    elevation: 1,
  },

  v3: {
    width: "95%",
    height: "90%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: c.c12,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: c.c27,
    elevation: 1
  },

  v4: {
    width: "100%",
    height: 100,
    // borderWidth: 2,
    justifyContent: "space-around",
    alignItems: "center"
  },

  t1: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    color: c.c8
  },

  v5: {
    width: "100%",
    height: 20,
    // borderWidth: 2,
    justifyContent: "space-around",
    alignItems: "center"
  },

  v6: {
    width: "100%",
    height: 70,
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  v7: {
    width: "100%",
    height: 70,
    // borderWidth: 2,
    justifyContent: "space-around",
    alignItems: "center"
  }
})

export default VerifyModal;