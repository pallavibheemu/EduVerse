import React from 'react'
import toast from 'react-hot-toast'
import { setLoading } from '../../slices/authSlice'
import { apiConnector } from '../apiconnector'
import { profileEndpoints } from '../apis'
import { setUser } from '../../slices/profileSlice'
import { logout } from './authAPI'

const {GET_USER_DETAILS_API,
     GET_USER_ENROLLED_COURSES_API,
     GET_INSTRUCTOR_DATA_API,
    }= profileEndpoints

export function getUserDetails (token, navigate){
  return async (dispatch) => {
    const toastId= toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
        const response= await apiConnector("GET", GET_USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`, //this is the 3rd way of extracting token in the backend
        })
        console.log(response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        const userImage= response.data.data.image
        ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

        dispatch(setUser({...response.data.data, image: userImage}))
    }catch(error){
        console.log(error);
        dispatch(logout(navigate))
        toast.error("Could not get User Details")

    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}


export async function getUserEnrolledCourses(token){
    const toastId= toast.loading("Loading...");
    let result= []
    try{
        console.log("before called backend api for enrolled courses")
        const response= await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        }) // we put null beause, we dont need a request body for get request

        console.log("After caliing backend Api for enrolled courses");

        
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result= response.data.data
    }catch(error){
        console.log(error);
        toast.error("Not able to Fetch Enrolled Courses");
    }
    toast.dismiss(toastId)
    return result
}


export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET INSTRCTOR DATA API RESPONSE.........", response)
        result = response?.data?.data

    }catch(error){
        console.log("GET_INSTRUCTOR DATA API ERROR.............", error)
        toast.error("could not get instrctor Data")
    }
    toast.dismiss(toastId)
    return result
}
