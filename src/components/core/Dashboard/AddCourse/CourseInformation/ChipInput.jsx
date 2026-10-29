import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function ChipInput({
    label, name, placeholder, register, errors, setValue, getValues
}){
    const {course, editCourse} = useSelector((state) => state.course)

    const [chips,setChips] = useState([])

    useEffect(() => {
        if(editCourse){
            setChips(course?.tag) //if we are not creating a new course and the existing 
            //course is being edited, then we display existing tags of that course in the 1st render itself
        }
            //otherwise
            register(name, {required:true, validate: (value) => value.length >0 }) //At least one tag is required"
        
    }, [])

    useEffect(() => {
        setValue(name, chips)
    }, [chips]) //Runs this code whenever chips changes.

    //function to handle user input when chips are added
    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === ","){
            //prevent default behaviour
            event.preventDefault()
            //get the input value and remove any leading / trailing spaces
            const chipValue= event.target.value.trim()
            //check if the input calue exists and is not already in the chips array
            if(chipValue && !chips.includes(chipValue)){
                //add chip to the array and clear the input
                const newChips= [...chips, chipValue]
                setChips(newChips)
                event.target.value= ""
            }
        }
    }



    //function to handle the deletion of the chip
    const handleDeleteChip = (chipIndex) => {
        //filter the chips array to remove the chip with given index
        const newChips= chips.filter((_,index) => index!=chipIndex)
        setChips(newChips)
    }
 
    //render the component
    return (
   <div className='flex flex-col space-y-2'>
    <label className='text-sm text-richblack-5'  htmlFor={name}>
        {label} <sup className='text-pink-200'>*</sup>
    </label>
    {/* rendering the chips and input */}
    <div className='flex w-full flex-wrap gap-y-2'>
        {/* map over the chips array and render each chip */}
        {
            chips.map((chip,index) => (
                <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                    {chip}
                    <button type='button' className='ml-2 focus:outline-none' onClick={()=> handleDeleteChip(index)}>
                    <MdClose className='text-sm'/>
                   </button>
                </div>
            ))}
            {/* render the input for adding new chips */}
            <input 
            id={name}
            name={name}
            type="text" 
            placeholder={placeholder}
            onKeyDown={handleKeyDown} //the key here implies enter
            className='form-style w-full'
            />
    </div>

    {
        errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )
    }
   </div>
  )
}
