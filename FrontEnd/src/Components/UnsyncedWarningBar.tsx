import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNFS from "react-native-fs"
import {UpdateAllNotesAPI} from "../APIs/DatabaseAPIs"
import { useState } from "react";
import { useAppContext } from "../Hooks/useAppContext";

// ==================================================
// Types ==================================================

type props = {

  isConnected:boolean|null,
  setUnsyncedNotesExist:(value:boolean)=>void,

}

// ==================================================
// ==================================================


const UnsyncedWarningBar = (
  {
    isConnected,
    setUnsyncedNotesExist
  
  }:props
  
) => {

  // ==================================================
  // Declarations ==================================================

  const {AllNotesFilePath, UnsyncedNotesFilePath} = useAppContext();

  const [Loading, setLoading] = useState<boolean>(false)

  // ==================================================
  // ==================================================


  // ==================================================
  // onPress ==================================================

  const onSyncPress = async () => {

    try
    {
      setLoading(true)

      if(isConnected)
      {
        const FileExists = await RNFS.exists(UnsyncedNotesFilePath)

        if(FileExists)
        {
          const AllNotesStat = await RNFS.stat(AllNotesFilePath)
          const UnsyncedNotesStat = await RNFS.stat(UnsyncedNotesFilePath)

          if(UnsyncedNotesStat.mtime > AllNotesStat.mtime)
          {
            const JsonData = await RNFS.readFile(UnsyncedNotesFilePath)
            const data = JSON.parse(JsonData)
            
            const result = await UpdateAllNotesAPI(data)

            if(result === "success")
            {
              await RNFS.unlink(UnsyncedNotesFilePath)
              setUnsyncedNotesExist(false)
            }
            else
            {
              setUnsyncedNotesExist(true)
            }

          }
          else
          {
            await RNFS.unlink(UnsyncedNotesFilePath)
          }
        }
        else
        {
          setUnsyncedNotesExist(false)
        }
      }
      else
      {
        Alert.alert("Sync Failed", "Internet Connection required to sync")
      }
    }
    catch(err)
    {
      Alert.alert("Error", "Sync Failed")
    }
    finally
    {
      setLoading(false)
    }
  }

  // ==================================================
  // ==================================================

  return(

    <View style={s.v1}>


      <Text style={s.t1}>Some notes haven't been synced</Text>
      
      <View style={s.v2}>
        {
        
          Loading ? 
          
          <ActivityIndicator size="small" color="#ff6600" />
        
          :
        
          <TouchableOpacity
            style={s.b1}
            onPress={onSyncPress}
          >
            <Text style={s.t2}>Sync</Text>
              
          </TouchableOpacity>
        
        }
      </View>
                
    </View>

  )

}

const s = StyleSheet.create({

  v1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  t1: {
    textAlign: "center",
    color: "#e8997eff",
    fontSize: 12
  },

  b1: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#76262dff",
    backgroundColor: "#e8997eff",
    opacity: 0.3
  },

  t2: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    padding: 0,
    color: "#8d2300ff"
  },

  v2: {
    height: 20,
    width: 75,
    justifyContent: "center",
    alignItems: "center"
  }

})

export default UnsyncedWarningBar;
