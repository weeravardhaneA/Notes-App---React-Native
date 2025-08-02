import { useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { useAppContext } from "./useAppContext";
import { useOnStartHook } from "./useOnStartHook";
import { useSharedHook } from "./useSharedHook";


export const useStartupEffects = () => {
  
  // ==================================================
  // Declarations ==================================================

  const {setConnected, setShowingNotes, AllNotes, setActiveScreen} = useAppContext();

  const {SyncNotesFromStorage, SyncPendingChanges} = useOnStartHook();

  const {RetrieveToken} = useSharedHook();

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
      await SyncPendingChanges();
      
    })()
    
  }, [])

  // ==================================================
  // ==================================================

  useEffect(() => {

    (async () => {

      const token = await RetrieveToken("token")

      if(token)
      {
        setActiveScreen("home")
      }
      else
      {
        setActiveScreen("auth")
      }

    })()

  }, [])

  // ==================================================
  // ==================================================

}