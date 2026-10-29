import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({children, active, linkto}) => {
  return (
        <Link to={linkto}>
            <div className={`hover:scale-90 duration-200 font-semibold rounded-md px-5 py-[9px]
            ${active? ' text-richblack-900 bg-yellow-50': 'bg-black shadow-md shadow-richblack-300'}`}>
                {children}
            </div>

        </Link>
  )
}
