import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNFS from "react-native-fs"
import UpdateNotesAPI from "../APIs/UpdateNotesAPI";
import { useState } from "react";
import { useAppContext } from "../Hooks/useAppContext";
import ReadFile from "../Helpers/ReadFile";
import DeleteNotesAPI from "../APIs/DeleteNotesAPI";
import log from "../Helpers/log";




const UnsyncedWarningBar = () => {

  // ==================================================
  // Declarations ==================================================

  const {Connected, ToDeleteFilePath, ToUpdateFilePath, setToDeleteFileExists, setToUpdateFileExists} = useAppContext();

  const [Loading, setLoading] = useState<boolean>(false)

  // ==================================================
  // ==================================================


  // ==================================================
  // onPress ==================================================

  const onSyncPress = async () => {

    try
    {
      setLoading(true)

      if(Connected)
      {
        const ToDeleteArray = await ReadFile(ToDeleteFilePath)
        const ToUpdateArray = await ReadFile(ToUpdateFilePath)

        if(ToUpdateArray)
        {
          const result = await UpdateNotesAPI(ToUpdateArray)

          if(result)
          {
            await RNFS.unlink(ToUpdateFilePath)
            setToUpdateFileExists(false)
          }
          else
          {
            setToUpdateFileExists(true)
          }
        }
        
        if(ToDeleteArray)
        {
          const result = await DeleteNotesAPI(ToDeleteArray)

          if(result)
          {
            await RNFS.unlink(ToDeleteFilePath)
            setToDeleteFileExists(false)
          }
          else
          {
            setToDeleteFileExists(true)
          }
        }

      }
      else
      {
        Alert.alert("Sync Failed", "Internet connection is required to sync.")
      }
    }
    catch(err)
    {
      log("Sync failed", err)
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
