import { useState } from "react"

export const useLoginRegisterHook = () => {

  // ==================================================
  // Declarations ==================================================

  const [ActiveTab, setActiveTab] = useState<string>("login")
  const [Email, setEmail] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const [ConfirmPassword, setConfirmPassword] = useState<string>("")
  const [Error, setError] = useState<string>("")

  // ==================================================
  // ==================================================

  const OnLoginTabPress = () => {

    setActiveTab("login")

  }

  // ==================================================
  // ==================================================

  const OnRegisterTabPress = () => {

    setActiveTab("register")

  }

  // ==================================================
  // ==================================================

  const OnLoginButtonPress = () => {

  }

  // ==================================================
  // ==================================================

  const OnRegisterButtonPress = () => {

    if(!Email) {setError("Enter a your email address."); return}
    else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(Email)) {setError("Enter a valid email address."); return}
    else if(!Password) {setError("Please enter your password."); return}
    else if(Password.length < 8) {setError("Password must be at least 8 characters long."); return}
    else if(!ConfirmPassword) {setError("Please confirm your password."); return}
    else if(Password !== ConfirmPassword) {setError("Passwords do not match. Please try again."); return}
    else {setError("")}
    
  }

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
    OnLoginTabPress,
    OnRegisterTabPress,
    OnLoginButtonPress,
    OnRegisterButtonPress, 
    Error,
  }

}