import React from 'react'

export default function IconBtn ({
    text, //Text displayed inside the button
    children, //Anything placed between <IconBtn>...</IconBtn>
    onclick, //Function to run when clicked
    disabled, //Disables the button
    outline=false, //Decides whether button is outlined
    customClasses, //Extra Tailwind classes
    type, //Button type, e.g. submit, button
}) {
  return (
   <button disabled={disabled} onClick={onclick} className={`flex items-center ${
    outline? "borse border-yellow-50 bg-transparent" : "bg-yellow-50"
   } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
   type={type}>
    {
        children? (
            <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
            </>
        ) : (text)
    }
   </button>
  )
}
