import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import RenderSteps from '../AddCourse/RenderSteps'

export default function EditCourse () {
    const dispatch = useDispatch()
    const {courseId}= useParams() //coz we passed the course id in the url/navigaete in the instrctor courses folder
    const [loading, setLoading]= useState(false)
    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId,token)
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        })()

    },[])

    if(loading) {
        return (
            <div className='grid flex-1 place-items-center'>
            <div className='spinner'></div>
            </div>
        )
    }


  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
        Edit Course
        </h1>
        <div className='mx-auto max-w-[600px]'>
         {course? (
            <RenderSteps/>
         ) : (
            <p className='mt-14 text-center text-3xl font-semibold text-richblack-100'>
                Course Not found
            </p>
         )}
        </div>
    </div>
    
  )
}
