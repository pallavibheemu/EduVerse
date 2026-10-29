import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { createSection, updatesection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import  NestedView  from './NestedView'
import toast from 'react-hot-toast'
import { MdNavigateNext } from 'react-icons/md'

export default function CourseBuilderForm () {

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }=useForm()
    const [editSectionName, setEditSectionName] = useState(null)
    const {course}= useSelector((state) => state.course);
    const dispatch = useDispatch()
    const {token}= useSelector((state) => state.auth);
    const [loading, setLoading]= useState(false);

    useEffect( () => {
        console.log("UPDATED")
    },[course])


  const onSubmit = async (data) => {
    setLoading(true)

    if (editSectionName) {

        // EDIT EXISTING SECTION
        const result = await updatesection(
            {
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            },
            token
        )

        console.log("EDIT RESULT:", result)

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id.toString() === editSectionName.toString()
                    ? {
                        ...section,
                        sectionName: result.sectionName
                    }
                    : section
            )

            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            }

            dispatch(setCourse(updatedCourse))

            setEditSectionName(null)
            setValue("sectionName", "")
        }

    } else {

        // CREATE NEW SECTION
        const result = await createSection(
            {
                sectionName: data.sectionName,
                courseId: course._id,
            },
            token
        )

        console.log("CREATE RESULT:", result)

        if (result) {
            dispatch(setCourse(result))
            setValue("sectionName", "")
        }
    }

    setLoading(false)
}

     const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const gotoNext = () => {
        if(course?.courseContent?.length === 0){
            toast.error("Please add atleast one Section");
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each Section");
            return
        } //here .some() loops through each section.

        //if everuthing is good
        dispatch(setStep(3));
    }
   

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId){ //If both IDs match, it means the user clicked the section that's already in edit mode. which means we have to show create section button
            cancelEdit();
            return;
        }
        
        // we put in the prviously existing value in the edit name
        setEditSectionName(sectionId); //Enable edit mode for the selected section
        setValue("sectionName", sectionName); //and the previously given name will be displayed
    }

  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='sectionName'>Section name <sup className='text-pink-200'>*</sup></label>
                <input 
                id='sectionName'
                disabled={loading}
                placeholder='Add a section to build your course' 
                {...register("sectionName", {required:true})}
                className='form-style w-full'
                />

                {
                    errors.sectionName && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Section Name is required</span>
                    )}
            </div>
            <div className='flex items-end gap-x-4'>
                <IconBtn type="Submit"
                text={editSectionName ?
                         "Edit Section Name" : "Create Section"}
                         outline={true}
                         disabled={loading}
                         customClasses={"text-white"}>
                            <IoAddCircleOutline className='text-yellow-50' size={20}/> 
                </IconBtn>
                {
                    editSectionName && (
                        <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline ml-10'>
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>

        {
            course?.courseContent?.length >0 && (
                <NestedView handleChangeEditSectionName= {handleChangeEditSectionName} />
            )
        }

        <div className='flex justify-end gap-x-3'>
            <button onClick={goBack} className='rounded-md cursor-pointer flex items-center gap-x-2 bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
                Back
            </button>
            <IconBtn text="Next" disabled={loading} onclick= {gotoNext}>
                <MdNavigateNext/>
            </IconBtn>

        </div>

    </div>
  )
}
