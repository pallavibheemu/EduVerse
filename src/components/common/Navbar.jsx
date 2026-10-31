import React, { useEffect, useState } from 'react'
import eduverseLogo from '../../assets/Logo/eduverse-logo-3.png'
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from 'react-icons/ai'

export const Navbar = () => {

    const {token}= useSelector((state)=> state.auth); 
    const {user} = useSelector((state)=> state.profile); 
    const {totalItems} = useSelector((state)=> state.cart); 
    const location= useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname) //checks and returns whether the route that we sent and the current location that we are standing on are the same
    }

    const [subLinks, setSubLinks] = useState([]); 
    const [loading, setLoading] = useState(false)
    //This creates a React state variable:, Initially, it is an empty array 
    // because you haven't received anything from the backend yet.

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try{
                const res= await apiConnector("GET", categories.CATEGORIES_API)
                setSubLinks(Array.isArray(res?.data?.data) ? res.data.data : [])
            }
            catch(error){
                console.log("Could not fetch Categories. ", error)
            }
            setLoading(false)
        })()
    },[])


  return (
    <div className={`flex items-center justify-center border-b-[1px] h-14  border-b-richblack-700 ${
  location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to={"/"} >
            <img src={eduverseLogo} alt="logo" width={160} height={42} loading='lazy'/>
            </Link>       


            {/* nav links */}
            <nav className='hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index)=> (
                           <li key={index}>{
                                link.title === "Catalog" ? (
                                <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                    matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"
                                }`}>
                                    <p>{link.title}</p>
                                    <IoIosArrowDown />


                                    <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px]
                                    translate-x-[-50%] translate-y-[3rem] flex-col rounded-lg bg-richblack-5
                                     p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible
                                      group-hover:opacity-100 group-hover:translate-y-[1.65rem] lg:w-[300px]'>
                            
                                        <div className='absolute left-[50%] 
                                        top-0 h-6 w-6  -z-10 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded
                                         bg-richblack-5'>
                                        </div>

                                        { loading? (
                                            <p className='text-center'>Loading...</p>

                                        ):subLinks.length > 0 ?(
                                               <>
                                                {
                                                    subLinks?.filter((subLink) => subLink?.courses?.length >0 )?.map((subLink, i) => (
                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                        className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' key={i}>
                                                        <p>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                }
                                               </>
                                        ):(
                                            <p className='text-center'>No Courses Found</p>
                                        )
                                    }
                                    </div>
                                </div>
                                ): (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path)? "text-yellow-25" :  "text-richblack-25"}`}>
                                            {link.title}</p>
                                    </Link>
                                ) 
                            }

                            </li>
                        ))
                    }
                </ul>
            </nav>


            {/* login/signup/dashboard */}

            <div className='flex gap-x-4 items-center'>
                    {
                        user&&user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <IoCartOutline className='text-richblack-100' />
                                {
                                    totalItems>0 && (
                                        <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token===null && (
                            <Link to= "/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md  hover:text-white duration-300 cursor-pointer transition-all hover:scale-90'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                     {
                        token===null && (
                            <Link to= "/signUp">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md hover:text-white duration-300 cursor-pointer transition-all hover:scale-90'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!=null && <ProfileDropDown/>
                    }

            </div>
            <button className='mr-4 md:hidden'>
                <AiOutlineMenu fontSize={24} fill='#AFB2BF'/>
            </button>
        </div>
    </div>
  )
}
