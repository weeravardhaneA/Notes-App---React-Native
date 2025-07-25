import { Dimensions, FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import SearchBox from "../Components/SearchBox"
import NoteCard from "../Components/NoteCard"
import { useHomeHook } from "../Hooks/useHomeHook";
import DeleteButton from "../Components/DeleteButton";
import AddButton from "../Components/AddButton";
import UnsyncedWarningBar from "../Components/UnsyncedWarningBar";
import { useAppContext } from "../Hooks/useAppContext";

const ScreenWidth = Dimensions.get("window").width;


const HomeScreen = () => {

  // ==================================================
  // Declarations ==================================================

  const {SelectModeOn, AllNotes, ShowingNotes, Connected, UnsyncedNotesExist, setUnsyncedNotesExist,} = useAppContext()

  const {CheckSelected, onDeletePress, onNotePress, onPlusPress, onNoteLongPress, onSearchTextChange} = useHomeHook();

  // ==================================================
  // ==================================================

  return(

    <SafeAreaView style={s.sav1}>
  
      <View style={s.v1}>

        <SearchBox onChangeText={onSearchTextChange} dataArray={AllNotes}/>

        <View style={s.v2}>

          { SelectModeOn ? <DeleteButton onPress={onDeletePress}/> : <AddButton onPress={onPlusPress}/> }

        </View>

      </View>

      <View>
        { UnsyncedNotesExist ? <UnsyncedWarningBar isConnected={Connected} setUnsyncedNotesExist={setUnsyncedNotesExist}/> : null }
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
  
    </SafeAreaView>

  )

}

const s = StyleSheet.create({
  
  sav1: {
    flex: 1,
    backgroundColor: "#fff7ed",
  },

  v1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 20,
    paddingRight: 24,
    backgroundColor: "#fff7ed",
    borderBottomWidth: 1,
    borderBottomColor: "#fcd5ce",
    shadowColor: "#f87171",
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
    borderTopWidth: 1,
    borderTopColor: "#fcd5ce",
  },

  colStyle: {
    justifyContent: "space-between",
    paddingHorizontal: ScreenWidth * 0.05,
  },
})

export default HomeScreen;