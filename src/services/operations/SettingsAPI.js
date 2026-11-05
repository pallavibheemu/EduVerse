import React from 'react'
import { settingsEndpoints } from '../apis'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { setUser } from '../../slices/profileSlice'
import { logout } from './authAPI'


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API,

}= settingsEndpoints


export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading profile picture...");

        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("PROFILE PICTURE RESPONSE:", response.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedUser = response.data.data;

            localStorage.setItem("user", JSON.stringify(updatedUser));

            dispatch(setUser(updatedUser));

            toast.success("Display picture updated successfully");

        } catch (error) {
            console.error(
                "PROFILE PICTURE UPDATE ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Could not update display picture"
            );

        } finally {
            toast.dismiss(toastId);
        }
    };
}


export function updateProfile(token, formData){
    return async (dispatch) => {
        const toastId= toast.loading("Loading...")
        try{
            const response= await apiConnector("PUT", UPDATE_PROFILE_API,formData, {
                Authorization: `Bearer ${token}`,
            }) 
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage= response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.LastName}`

            dispatch(setUser({...response.data.updatedUserDetails, image:userImage}))
            toast.success("Profile Updated Successfully")
        }catch(error){
            console.log(error);
            toast.error("could not update Profile")
        }
        toast.dismiss(toastId)
    }
}


export async function changePassword(token, formData){
    const toastId= toast.loading("Loading...")
    try{
        const response= await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
                Authorization: `Bearer ${token}`,
            }) 
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Changed Successfully")

    }catch(error){
                console.error(
        "CHANGE_PASSWORD_API ERROR:",
        error.response?.data || error.message
        );
            toast.error("Could Not Change Password")
        }
        toast.dismiss(toastId)
}

export function deleteProfile(token, navigate){
    return async (dispatch) => {
        const toastId= toast.loading("Loading...")
        try{
            const response= await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization: `Bearer ${token}`,
            }) 
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        }catch(error){
            console.log(error);
            toast.error("could not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}




