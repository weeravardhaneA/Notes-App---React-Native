/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import s from "./Styles"
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import RNFS, { writeFile } from "react-native-fs"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";


function App() {

  // Variables ============================================

  const FolderPath = RNFS.DocumentDirectoryPath
  const AllNotesFilePath = FolderPath + "/AllNotes.json"

  const [SearchText, setSearchText] = useState("")

  const [ActiveScreen, setActiveScreen] = useState("home")
  const [NoteStatus, setNoteStatus] = useState("")

  const [ClickedId, setClickedId] = useState<number>()
  const [Title, setTitle] = useState("")
  const [Note, setNote] = useState("")

  const [SelectModeOn, setSelectModeOn] = useState(false)
  const [SelectedItems, setSelectedItems] = useState<any>([])

  const [AllNotes, setAllNotes] = useState([

    {id: 1, title: "hello", note: "text1"},
    {id: 2, title: "lfffffffffffff", note: "text2"},
    {id: 3, title: "ghh", note: "text3"},

  ])

  const [ShowingNotes, setShowingNotes] = useState<any>([])


  useEffect(() => {

    setShowingNotes(AllNotes)

  }, [AllNotes])

  // ============================================
  // ============================================
  // ============================================



  // Functions ============================================

  const onStart = async () => {

    if(Platform.OS === "android")
    {
      // Permissions ============================

      const p1 = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      const p2 = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

      const p1s1 = await check(p1)
      const p2s1 = await check(p2)

      if(p1s1 !== RESULTS.GRANTED)
      {
        const p1s2 = await request(p1)

        if(p1s2 !== RESULTS.GRANTED)
        {
          Alert.alert("Error", "Permissions Required")
        }
      }

      if(p2s1 !== RESULTS.GRANTED)
      {
        const p2s2 = await request(p2)

        if(p2s2 !== RESULTS.GRANTED)
        {
          Alert.alert("Error", "Permission Required")
        }
      }

      // Permissions ============================

      // FileSystem ============================

 
      const FileExist = await RNFS.exists(AllNotesFilePath)

      if(!FileExist)
      {
        await RNFS.writeFile(AllNotesFilePath, JSON.stringify([]), "utf8")
      }

      const JsonData = await RNFS.readFile(AllNotesFilePath)
      const data = JSON.parse(JsonData)

      setAllNotes(data)

      // FileSystem ============================
    }
    else
    {
      return null
    }
  }

  useEffect(() => {

    (async() => {

      await onStart()

    })()

  }, [])



  const CheckSelected = (id: number) => {

    const result = SelectedItems.find((item: any) => {

      if(item == id)
      {
        return true
      }

    })

    return result

  }

  const AddToSelectedItems = (id: number) => {

    if(SelectedItems.length <= 0)
    {
      setSelectModeOn(true)
    }

    const newArray = [...SelectedItems, id]

    setSelectedItems(newArray)

  }

  const RemoveFromSelectedItems = (id: number) => {

    const newArray = SelectedItems.filter((item: any) => {

      if(item != id)
      {
        return item
      }

    })

    setSelectedItems(newArray)

    if(newArray.length <= 0)
    {
      setSelectModeOn(false)
    }

  }

  // ============================================
  // ============================================
  // ============================================


  // onPress ============================================

  const onPlusPress = () => {

    setActiveScreen("note")
    setNoteStatus("insert")

  }
  
  const onNotePress = (id:number) => {
    
    if(SelectModeOn)
    {
      if(CheckSelected(id))
      {
        RemoveFromSelectedItems(id)
      }
      else
      {
        AddToSelectedItems(id)
      }
    }
    else
    {
      setClickedId(id);
      const ClickedItem = ShowingNotes.find((item: any)=>item.id==id)
  
      setActiveScreen("note")
      setNoteStatus("update")
  
      if(ClickedItem)
      {
        setTitle(ClickedItem.title)
        setNote(ClickedItem.note)
      }
    }

  }

  const onCancelPress = () => {

    setActiveScreen("home")
    setNoteStatus("")
    setTitle("")
    setNote("")

  }

  const onSavePress = async () => {

    if(NoteStatus=="update" && ClickedId)
    {
      const newArray = AllNotes.map((item)=>{

        if(item.id==ClickedId)
        {
          return {...item, title: Title, note: Note}
        }
        return item
      })
      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(newArray), "utf8")
      setAllNotes(newArray)
    }
    else if(NoteStatus=="insert")
    {
      let newId;
      if(AllNotes.length < 1)
      {
        newId = 1
      }
      else
      {
        newId = AllNotes[AllNotes.length-1].id+1
      }
      const newArray = [...AllNotes, {id: newId, title: Title, note: Note}]

      await RNFS.writeFile(AllNotesFilePath, JSON.stringify(newArray), "utf8")
      setAllNotes(newArray)
    }

    setActiveScreen("home")
    setNoteStatus("")
    setTitle("")
    setNote("")
  }


  const onDeletePress = () => {
    
    const newArray = AllNotes.filter((item) => {

      if(!SelectedItems.includes(item.id))
      {
        return item
      }

    })

    setAllNotes(newArray)
    setSelectedItems([])
    setSelectModeOn(false)

  }

  // ============================================
  // ============================================
  // ============================================


  // onLongPress ============================================

  const onNoteLongPress = (id: number) => {

    if(CheckSelected(id))
    {
      RemoveFromSelectedItems(id)
    }
    else
    {
      AddToSelectedItems(id)
    }
  }

  // ============================================
  // ============================================
  // ============================================


  // onChange ============================================

  const onSearchTextChange = (text: string) => {

    setSearchText(text)

    if(text == "")
    {
      setShowingNotes(AllNotes)
    }
    else
    {
      const matchedItemArray = AllNotes.filter((item) => {
  
        if(item.title.startsWith(text))
        {
          return item
        }

      })

      setShowingNotes(matchedItemArray)
    }

  }

  // ============================================
  // ============================================
  // ============================================


  if(ActiveScreen === "home")
  {
    return (
      <SafeAreaView style={s.sav2}>
  
        <View style={s.v1}>
          <View style={s.v6}>
            <TextInput
              placeholder="Search"
              value={SearchText}
              onChangeText={(text)=>{onSearchTextChange(text)}}
            ></TextInput>
          </View>

          <View style={s.v8}>

            { SelectModeOn ?
              
              <TouchableOpacity
                onPress={onDeletePress}
              >
                
                <Text style={s.b1t2}>🗑️</Text>

              </TouchableOpacity>

              :

              <TouchableOpacity
                onPress={onPlusPress}
              >
                <Text style={s.b1t1}>+</Text>
              </TouchableOpacity>
            }

          </View>

        </View>
  
        <FlatList
          data={ShowingNotes}
          numColumns={2}
          keyExtractor={(item)=>item.id.toString()}
          columnWrapperStyle={s.colStyle}
          renderItem={({item})=> 
          
            <TouchableOpacity
              style={CheckSelected(item.id) ? s.v7 : s.v2}
              onPress={()=>onNotePress(item.id)}
              onLongPress={()=>onNoteLongPress(item.id)}
            >
              <Text style={s.t1}>{item.title}</Text>
              <Text style={s.t2}>{item.note}</Text>
            </TouchableOpacity>
  
          }
        />
  
      </SafeAreaView>
    );
  }
  else if(ActiveScreen === "note")
  {
    return(
      <SafeAreaView style={s.sav1}>
        
        <View style={s.v3}>
          <Text>Note Page</Text>
        </View>

        <View style={s.v4}>
          <View>
            <TextInput
              style={s.i1}
              placeholder="Title"
              value={Title}
              onChangeText={setTitle}
              multiline={true}></TextInput>
          </View>
          <ScrollView>
            <TextInput
              style={s.i2}
              placeholder="Note"
              value={Note}
              onChangeText={setNote}
              multiline={true}></TextInput>
          </ScrollView>
        </View>

        <View style={s.v5}>
          <TouchableOpacity style={s.b2} onPress={onCancelPress}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.b3} onPress={onSavePress}>
            <Text style={s.t3}>Save</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
      
  }
  else
  {
    return(
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    )
  }
}

export default App;