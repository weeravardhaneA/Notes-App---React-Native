import { useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { useAppContext } from "./useAppContext";
import { OnStartHook } from "./OnStartHook";


export const useStartupEffects = () => {
  
  // ==================================================
  // Declarations ==================================================

  const {setConnected, setShowingNotes, AllNotes, setAllNotes, setUnsyncedNotesExist} = useAppContext();

  const {SyncNotesFromStorage} = OnStartHook();

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
      
      await SyncNotesFromStorage();
      
    })()
    
  }, [])

  // ==================================================
  // ==================================================

}