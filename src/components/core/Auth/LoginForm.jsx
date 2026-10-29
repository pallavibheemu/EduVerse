import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { login } from '../../../services/operations/authAPI';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [formData, setFormData] = useState({
        email:"",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleOnChange = (event) => {
        //It's an object containing information about what happened,  "event.target" which refers to the <input> that triggered the event.
        setFormData((prevData) => ({
            ...prevData, 
            [event.target.name]: event.target.value
        }))
    }


    const handleOnSubmit= (event) => {
        event.preventDefault(); // this prevent browser from reloading the page after clicking the submit button
        dispatch(login(email,password,navigate))
        //dispatch is how you send an action/thunk to Redux. You're saying:"Redux, I want you to perform the login operation using this email and password.", and navigate is there to help you to move to the other page
    }

    const {email, password} = formData //we write this because, if we waana console log email then we have to write console.log(formData.email) , but now we can just write console.log(email) and it will work

  return (
    <div>
        <form onSubmit={handleOnSubmit} className='mt-6 flex w-full flex-col gap-y-4'>
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
                className='w-full rounded=[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                />
            </label>

            <label className='relative'>
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    {/* leading in Tailwind means line-height. Line-height controls the vertical space between those lines. */}
                   Password <sup className='text-pink-200'>*</sup>
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

                <Link to = "/forgot-password">
                <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
                    Forgot Password
                </p>
                </Link>
            </label>

            <button type='submit' className='mt-6 rounded-[8px]
             bg-yellow-50 py-[8px] font-medium text-richblack-900'>Sign In</button>
        </form>
    </div>
  )
}
