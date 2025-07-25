import { useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { useAppContext } from "./useAppContext";
import onStart from "../Handlers/onStart";

export const useStartupEffects = () => {
  
  // ==================================================
  // Declarations ==================================================

  const {setConnected, setShowingNotes, AllNotes, setAllNotes, setUnsyncedNotesExist} = useAppContext();

  // ==================================================
  // ==================================================

  useEffect(() => {

    
    (async() => {

      const status = await NetInfo.fetch()
      setConnected(status.isConnected)

    })();

    const NetEventListener = NetInfo.addEventListener((status) => {

      setConnected(status.isConnected)

    })

    return NetEventListener;

  }, [])

  // ==================================================
  // ==================================================

  useEffect(() => {

    setShowingNotes(AllNotes)

  }, [AllNotes])
  
  // ==================================================
  // ==================================================
  
  useEffect(() => {
    
    (async() => {
      
      await onStart({setAllNotes, setUnsyncedNotesExist})
      
    })()
    
  }, [])

  // ==================================================
  // ==================================================

}