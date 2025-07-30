import { useState } from "react"
import { useAppContext } from "./useAppContext"
import RegisterUserAPI from "../APIs/RegisterUserAPI";

export const useLoginRegisterHook = () => {

  // ==================================================
  // Declarations ==================================================

  const {setError, setShowVerifyModal} = useAppContext();

  const [ActiveTab, setActiveTab] = useState<string>("login")
  const [Email, setEmail] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const [ConfirmPassword, setConfirmPassword] = useState<string>("")
  

  // ==================================================
  // ==================================================

  const onLoginTabPress = () => {

    setActiveTab("login")
    if(ActiveTab !== "login"){setError("")}

  }

  // ==================================================
  // ==================================================

  const onRegisterTabPress = () => {

    setActiveTab("register")
    if(ActiveTab === "login"){setError("")}

  }

  // ==================================================
  // ==================================================

  const onLoginButtonPress = () => {

  }

  // ==================================================
  // ==================================================

  const onRegisterButtonPress = async () => {
    
    
    if(!Email.trim()) {setError("Enter a your email address."); return}
    else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(Email)) {setError("Enter a valid email address."); return}
    else if(!Password) {setError("Please enter your password."); return}
    else if(Password.length < 8) {setError("Password must be at least 8 characters long."); return}
    else if(!ConfirmPassword) {setError("Please confirm your password."); return}
    else if(Password !== ConfirmPassword) {setError("Passwords do not match. Please try again."); return}
    else {setError("")}
    
    const result = await RegisterUserAPI(Email, Password)
    
    if(result)
      {
        setError("")
        // setEmail("")
        // setPassword("")
        // setConfirmPassword("")
        setShowVerifyModal(true)
    }
    else
    {
      setError("Something went wrong. Please try again later.")
    }
    
  }

  // ==================================================
  // ==================================================

  const onConfirmPress = (otp:number) => {

    console.log(otp)

  }

  // ==================================================
  // ==================================================

  // ==================================================
  // ==================================================

  return{
    ActiveTab,
    Email,
    setEmail,
    Password,
    setPassword,
    ConfirmPassword,
    setConfirmPassword,
    OnLoginTabPress: onLoginTabPress,
    OnRegisterTabPress: onRegisterTabPress,
    OnLoginButtonPress: onLoginButtonPress,
    OnRegisterButtonPress: onRegisterButtonPress, 
    onConfirmPress,
  }

}