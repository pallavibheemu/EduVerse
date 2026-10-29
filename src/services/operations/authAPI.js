import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { setToken,setLoading} from '../../slices/authSlice'
import { endpoints } from '../apis'
import { setUser } from '../../slices/profileSlice'
import { resetCart } from '../../slices/cartSlice'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
}= endpoints

//this function sends an OTP to the user's email and then takes them to the OTP verification page.
export function sendOtp (email, navigate){
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
        })
        console.log("sendOTP API response.....", response)
        console.log(response.data.success)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("OTP Sent Successfully")
        navigate("/verify-email")

    }catch(error){
        console.log(error);
        toast.error("Could Not Send OTP")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId); //this removes the loading as we got the data

  }
}


export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async (dispatch) => {
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName, 
                email, 
                password, 
                confirmPassword,
                otp,
            })

            console.log(response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup Successfull")
            navigate("/login")

        }catch(error){
             console.log("SIGNUP ERROR:", error)
            console.log("BACKEND MESSAGE:", error?.response?.data?.message)

            toast.error(error?.response?.data?.message || "Signup Unsuccessful")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId= toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email, 
                password,
            })

            console.log(response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull")
            dispatch(setToken(response.data.token)) //Store the token in Redux
            const userImage= response.data?.user?.image ? response.data.user.image: `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.LastName}`
            dispatch(setUser({...response.data.user, image:userImage})) //dispatch(setUser({...response.data.user, image:userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token)) //Redux state disappears when the page is refreshed, but localStorage persists.so we store the token in local storage too
             localStorage.setItem("user", JSON.stringify(response.data.user)) 
            navigate("/dashboard/my-profile")
        }catch(error){
            console.log(error);
            toast.error("Login Unsuccessfull")
            navigate("/Login")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export function getResetPassToken(email, setEmailSent){
    return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
            email,
        })
        console.log(" reset pass token response.....", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Reset Email Sent")
        setEmailSent(true);

    }catch(error){
        console.log(error);
        toast.error("Failed to send email for resetting password")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId); //this removes the loading as we got the data
    }
}


export function resetPassword(password, confirmPassword, token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
        const response = await apiConnector("POST", RESETPASSWORD_API, {
            password,
            confirmPassword,
            token,
        })
        console.log(" reset password response.....", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Password Has Been Reset Successfully")

    }catch(error){
        console.log(error);
        toast.error("Unable to Reset password")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId); 

    }
}
