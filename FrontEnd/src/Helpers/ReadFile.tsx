import RNFS from "react-native-fs"

const ReadFile = async (filePath:string) => {

  try
  {
    const fileExists = await RNFS.exists(filePath)
  
    if(fileExists)
    {
      const fileContent = await RNFS.readFile(filePath)
      const data = JSON.parse(fileContent)
      return data;
    }
    else
    {
      return [];
    }
  }
  catch(err)
  {
    return [];
  }

}

export default ReadFile;