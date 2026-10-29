import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import toast from 'react-hot-toast';
import {setSignupData} from '../../../slices/authSlice'
import { sendOtp, sendotp } from '../../../services/operations/authAPI'
import { Link } from 'react-router-dom';
import Tab from '../../common/Tab';

export const SignupForm= () => {
    const dispatch = useDispatch()
    const navigate= useNavigate()

    //student or instructor
    const [accountType, setAccountType]= useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName:"",
        lastName: "",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (event) => {
        //It's an object containing information about what happened,  "event.target" which refers to the <input> that triggered the event.
        setFormData((prevData) => ({
            ...prevData, 
            [event.target.name]: event.target.value
        }))
    }


    const handleOnSubmit= (event) => {
        event.preventDefault(); // this prevent browser from reloading the page after clicking the submit button
        if(password!= confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData= {
            ...formData,
            accountType,
        }

        //setting up signup data into the state in the auth slice, for further use
        dispatch(setSignupData(signupData))
        //send OTP for verification
        dispatch(sendOtp(formData.email, navigate))


        //for resetting everything
        setFormData({
            firstName:"",
            lastName: "",
            email:"",
            password:"",
            confirmPassword:"",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT) // this is the default value in the slidding tab above, hencwe after restting we set this to its default value
        
    }

    //data to pass to Tab component
    const tabData = [
        {
            id:1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id:2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,

        }
    ]
    
    const {firstName, lastName, email, password, confirmPassword} = formData //we write this because, if we waana console log email then we have to write console.log(formData.email) , but now we can just write console.log(email) and it will work

  return (
    <div>
        {/* tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
        <form onSubmit={handleOnSubmit} className='mt-6 flex w-full flex-col gap-y-4'>
             <div className='flex gap-x-4'>
            <label className='w-full'>
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                    First Name <sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type="text" 
                name='firstName'
                value={firstName}
                onChange={handleOnChange}
                placeholder='Enter first name'
                style={{
                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                }}
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>
            <label>
                 <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                   Last Name <sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type="text" 
                name='lastName'
                value={lastName}
                onChange={handleOnChange}
                placeholder='Enter last name'
                style={{
                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                }}
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>
            </div>


           
            <label className='w-full'>
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                    Email Address <sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type="email" 
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder='Enter Email address'
                style={{
                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                }}
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5'
                />
            </label>

             <div className='flex gap-x-4'>
            <label className='relative'>
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                  Create Password <sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type={showPassword? "text": "password"} 
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
                style={{
                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                }}
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5'
                />

                <span onClick={()=> setShowPassword((prev) => !prev)}
                    className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                        {
                            showPassword? (<AiOutlineEyeInvisible  fontSize={24} 
                                fill='#AFB2BF'/>):(<AiOutlineEye  fontSize={24} 
                                fill='#AFB2BF'/>)
                        }
                </span>
                 </label>
                 <label className='relative'>
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                  Confirm Password <sup className='text-pink-200'>*</sup>
                </p>

                <input 
                required
                type={showConfirmPassword ? "text": "password"}
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder='Confirm Password'
                style={{
                    boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"
                }}
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5'
                />

                <span onClick={()=> setShowConfirmPassword((prev) => !prev)}
                    className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                        {
                            showConfirmPassword? (<AiOutlineEyeInvisible  fontSize={24} 
                                fill='#AFB2BF'/>):(<AiOutlineEye  fontSize={24} 
                                fill='#AFB2BF'/>)
                        }
                </span>
                 </label>
                 </div>
           

            <button type='submit' className='mt-6 rounded-[8px]
             bg-yellow-50 py-[8px] font-medium text-richblack-900'>Create Account</button>
        </form>
    </div>
  )
}

