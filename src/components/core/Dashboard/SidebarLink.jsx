import React from 'react'
import * as Icons from 'react-icons/vsc' //this Imports all the icons exported from react-icons/vsc and put them inside an object called Icons.
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

export const SidebarLink = ({link,iconName}) => {

    const Icon = Icons[iconName];
    const location= useLocation();
    const dispatch= useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    //navlink is used when you want to style the link differently when it is active. as link tag only takes you to the given path, but navlink tells you wther you are active on the particular page or not
    // <NavLink to={link.path} className={`${matchRoute(link.path)? "bg-yellow-600": "bg-opacity-0"}`}>
    <NavLink
    to={link.path}
    className={({ isActive }) =>
        `relative px-8 py-2 text-sm font-medium ${
            isActive ? "bg-yellow-600 text-yellow-50" : "bg-opacity-0 text-richblack-300"
        } transition-all duration-200`}>

            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 
                ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}></span>

                <div className='flex item-center gap-x-2'>
                    <Icon className="text-lg"/>
                    <span>{link.name}</span>
                </div>
    </NavLink>
  )
}
