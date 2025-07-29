import { useAppContext } from "./src/Hooks/useAppContext";
import HomeScreen from "./src/Screens/HomeScreen";
import NoteScreen from "./src/Screens/NoteScreen";
import LoadingScreen from './src/Screens/LoadingScreen';
import { useStartupEffects } from './src/Hooks/useStartupEffects';
import LoginRegisterScreen from "./src/Screens/LoginRegisterScreen";

function App() {
  
  // ==================================================
  // ==================================================
  
  const {ActiveScreen} = useAppContext()

  // ==================================================
  // ==================================================
  
  useStartupEffects();

  // ==================================================
  // ==================================================
  
  if(ActiveScreen === "auth")
  {
    return( <LoginRegisterScreen/> );
  }
  else if(ActiveScreen === "home")
  {
    return ( <HomeScreen/> );
  }
  else if(ActiveScreen === "note")
  {
    return( <NoteScreen/> )
      
  }
  else
  {
    return( <LoadingScreen/> )
  }
}

export default App;