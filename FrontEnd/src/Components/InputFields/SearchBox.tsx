import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import c from "../../Utils/Colors";

// ==================================================
// Types ==================================================

type props = {

  onChangeText:(data:any[])=>void,
  dataArray:any[]

}

// ==================================================
// ==================================================


const SearchBox = (
  {
    onChangeText,
    dataArray
  
  }:props

) => {

  // ==================================================
  // Declarations ==================================================

  const [SearchText, setSearchText] = useState("")

  // ==================================================
  // ==================================================


  // ==================================================
  // onTextChange ==================================================

  const onSearchTextChange = (text: string) => {

    setSearchText(text)

    if(text == "")
    {
      onChangeText(dataArray)
    }
    else
    {
      const matchedItemArray = dataArray.filter((item) => {
  
        if(item.title.toLowerCase().startsWith(text.toLowerCase()))
        {
          return item
        }

      })

      onChangeText(matchedItemArray)
    }

  }

  // ==================================================
  // ==================================================

  return(

    <View style={s.v1}>
      <TextInput
        placeholder="Search"
        value={SearchText}
        onChangeText={(text)=>{onSearchTextChange(text)}}
      ></TextInput>
    </View>

  )

}

const s = StyleSheet.create({

  v1: {
    flex: 1,
    marginRight: 16,
    marginLeft: 12,
    backgroundColor: c.c9,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: c.c10,
    shadowColor: c.c11,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  }

})

export default SearchBox;