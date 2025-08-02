import { Dimensions, FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import SearchBox from "../Components/InputFields/SearchBox"
import NoteCard from "../Components/NoteCard"
import { useHomeHook } from "../Hooks/useHomeHook";
import UnsyncedWarningBar from "../Components/UnsyncedWarningBar";
import { useAppContext } from "../Hooks/useAppContext";
import c from "../Utils/Colors";
import FloatingButton from "../Components/Buttons/FloatingButton";
import Button1 from "../Components/Buttons/Button1";

const ScreenWidth = Dimensions.get("window").width;


const HomeScreen = () => {

  // ==================================================
  // Declarations ==================================================

  const {SelectModeOn, AllNotes, ShowingNotes, ToDeleteFileExists, ToUpdateFileExists} = useAppContext();

  const {CheckSelected, onDeletePress, onNotePress, onPlusPress, onNoteLongPress, onSearchTextChange} = useHomeHook();

  // ==================================================
  // ==================================================

  return(

    <SafeAreaView style={s.sav1}>
  
      <View style={s.v1}>

        <SearchBox onChangeText={onSearchTextChange} dataArray={AllNotes}/>

        <View style={s.v2}>

          <Button1
            text="⚙️"
            buttonStyle={{width:40, height:50}}
            textStyle={{fontSize:18}}
            
          />

        </View>

      </View>

      <View>
        { ToDeleteFileExists || ToUpdateFileExists ? <UnsyncedWarningBar/> : null }
      </View>
  
      <View style={s.v3}>

        <FlatList
          data={ShowingNotes}
          numColumns={2}
          keyExtractor={(item)=>item.id.toString()}
          columnWrapperStyle={s.colStyle}
          renderItem={({item})=> 
            
            <NoteCard
              onPress={onNotePress}
              onLongPress={onNoteLongPress}
              id={item.id}
              title={item.title}
              note={item.note}
              selected={CheckSelected(item.id)}
            />
    
          }
        />

      </View>

      {
        SelectModeOn ?

        <FloatingButton
          text="🗑️"
          viewStyle={{width:45, height:45, right:20, bottom:20}}
          buttonStyle={{}}
          textStyle={{lineHeight:45, color:c.c22, fontSize:30}}
          onPress={onDeletePress}
        />
          
        :
          
        <FloatingButton
          text="+"
          viewStyle={{width:45, height:45, right:20, bottom:20}}
          buttonStyle={{}}
          textStyle={{lineHeight:45, color:c.c22, fontSize:40}}
          onPress={onPlusPress}
        />

      }

  
    </SafeAreaView>

  )

}

const s = StyleSheet.create({
  
  sav1: {
    flex: 1,
    backgroundColor: c.c17,
  },

  v1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 20,
    paddingRight: 24,
    backgroundColor: c.c17,
    borderBottomWidth: 1,
    borderBottomColor: c.c18,
    shadowColor: c.c19,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  v2: {
    width: 30,
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  v3: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: c.c18,
    paddingVertical: 20
  },

  colStyle: {
    justifyContent: "space-between",
    paddingHorizontal: ScreenWidth * 0.05,
  },
})

export default HomeScreen;