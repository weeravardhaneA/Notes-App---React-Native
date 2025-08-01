import { useState } from "react"
import { useAppContext } from "./useAppContext"
import RegisterUserAPI from "../APIs/RegisterUserAPI";
import VerifyOtpAPI from "../APIs/VerifyOtpAPI";
import log from "../Utils/log";

export const useLoginRegisterHook = () => {

  // ==================================================
  // Declarations ==================================================

  const {setError, setShowVerifyModal, setActiveScreen, Connected} = useAppContext();

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

    try
    {

      const trimmedEmail = Email.trim();
      
      if(!trimmedEmail.trim())
      {
        setError("Enter your email address.");
        return;
      }
      else if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(trimmedEmail))
      {
        setError("Enter a valid email address.");
        return;
      }
      else if(!Password)
      {
        setError("Please enter your password.");
        return;
      }
      else if(Password.length < 8)
      {
        setError("Password must be at least 8 characters long.");
        return;
      }
      else if(!ConfirmPassword)
      {
        setError("Please confirm your password.");
        return;
      }
      else if(Password !== ConfirmPassword)
      {
        setError("Passwords do not match. Please try again.");
        return;
      }
      else {setError("");}
      
      if(!Connected)
      {
        setError("No internet connection. Please check your network and try again.")
        return;
      }
  
      const result = await RegisterUserAPI(trimmedEmail, Password)
  
      if(result)
        {
          setError("")
          setShowVerifyModal(true)
      }
      else
      {
        setError("Something went wrong. Please try again later.")
      }
    }
    catch(err)
    {
      log("unexpected error")
    }
    
  }

  // ==================================================
  // ==================================================

  const onConfirmPress = async (otp:string) => {

    try
    {
      const trimmedOtp = otp.trim();
  
      if(!trimmedOtp)
      {
        setError("Please enter the OTP.");
        return;
      }
      else if(trimmedOtp.length !== 6)
      {
        setError("OTP must be 6 digits.");
        return;
      }
      else if(!(/^\d+$/).test(trimmedOtp))
      {
        setError("OTP must contain digits only.");
        return;
      }
      else{setError("")}
  
      const result = await VerifyOtpAPI(Email, trimmedOtp)
  
      if(result)
      {
        setActiveScreen("home")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
      else
      {
        setError("Something went wrong. Please try again.")
        setShowVerifyModal(false)
      }
    }
    catch(err)
    {
      setError("unexpected error")
    }

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