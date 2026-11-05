import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import RatingStars from '../components/common/RatingStars'
import { BiInfoCircle } from 'react-icons/bi'
import { HiOutlineGlobeAlt } from 'react-icons/hi2'
import  CourseDetailsCard  from '../components/core/Course/CourseDetailsCard'
import ReactMarkdown from 'react-markdown'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'
import Footer from '../components/common/Footer'
import ConfirmationModal from '../components/common/ConfirmationModal'
import { Error } from './Error'
import { BuyCourse } from '../services/operations/studentFeaturesAPI'
import { formatDate } from '../services/formatDate'

export default function CourseDetails (){
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const {loading} = useSelector((state) => state.profile)
    const {paymnentLoading}= useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //getting courseId from url parameter
    const {courseId} = useParams()
    
    //declare a state to save the course details
    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)
    useEffect(() => {
        //calling fetch course details function
        ;(async () => {
            try{
            const res = await fetchCourseDetails(courseId)
            setResponse(res)
        }catch(error){
            console.log("could not fetch course details")
        }
        })()
    }, [courseId])


    //calculating the avg review count
    const [avgReviewCount, setAvgReviewCount]= useState(0)
  useEffect(() => {
    const reviews =
        response?.data?.courseDetails?.ratingAndReviews;

    console.log("Rating reviews:", reviews);

    const count = GetAvgRating(reviews);
    setAvgReviewCount(count);
}, [response]);


    const [isActive, setIsActive]= useState(Array(0)) //as there are multiple sections, we use an array which section is active and which is not
    const handleActive  = (id) => {
        setIsActive(!isActive.includes(id) //if the current section is not already active/open 
                    ? isActive.concat([id]) //open it/ add it into the array
                    : isActive.filter((e) => e!=id) //filter it out/delete it 
    )
    }


    //total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures = 0
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures)
    }, [response])


    if(loading || !response){
        return (
            <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
    if(!response.success){
        return <Error/>
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        courseContent,
        thumbnail,
        price,
        whatYouWillLearn,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    }= response.data?.courseDetails


    const handleBuyCourse = () => {
        if(token){
            BuyCourse(token, [courseId], user,navigate,dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add the course to your Cart",
            btn1Text: "Login",
            btn2Text : "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    if(paymnentLoading){
        return (
              <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }



  return (
    <>
        <div className='relative w-full bg-richblack-800'>
            {/* top section */}
            <div className='relative mx-auto w-full max-w-[1260px] px-4'>
    <div className='grid min-h-[318px] w-full justify-items-center py-8 lg:max-w-[810px] lg:justify-items-start lg:py-0'>
                    <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                            <img
                                src={thumbnail}
                                alt="Course thumbnail"
                                className='max-h-[30rem] w-full rounded-lg object-cover'
                            />
                    </div>
                    <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}>
                        <div>
                            <p className='text-3xl  text-richblack-5 sm:text-[42px]'>
                                {courseName}
                            </p>
                        </div>
                        <p className='text-richblack-200'>{courseDescription}</p>
                        <div className='text-md flex flex-wrap items-center gap-2'>
                            <span className='text-yellow-25'>{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                            <span>{`(${ratingAndReviews.length} reviews)`}</span>
                            <span>{`${studentsEnrolled.length} students enrolled`}</span>
                        </div>
                        <div>
                            <p className=''>
                                Created By {`${instructor.firstName} ${instructor.lastName}`}
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-5 text-lg'>
                            <p className='flex items-center gap-2'>
                                {" "}
                                <BiInfoCircle/> Created at {formatDate(createdAt)}
                            </p>
                            <p className='flex items-center gap-2'>
                                {" "}
                                <HiOutlineGlobeAlt/> English
                            </p>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                        <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                            Rs. {price}
                        </p>
                        <button className='yellowButton' onClick={handleBuyCourse}>
                            Buy Now
                        </button>
                        <button className='blackButton'>Add to Cart</button>
                    </div>
                </div>
                    {/* course card */}
                    <div className='absolute right-4 top-[60px] hidden w-full max-w-[380px] lg:block'>
                            <CourseDetailsCard
                                course={response?.data?.courseDetails}
                                setConfirmationModal={setConfirmationModal}
                                handleBuyCourse={handleBuyCourse}
                            />
                        </div>
            </div>
        </div>

                <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                    <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                        {/* what will you learn section */}
                        <div className='my-8 border border-richblack-600 p-8'>
                            <p className='text-3xl font-semibold'>What you'll learn</p>
                                <div className='mt-5'>
                                    <ReactMarkdown>
                                        {typeof whatYouWillLearn === 'string'
                                         ? whatYouWillLearn : ''}
                                    </ReactMarkdown>
                                 {/* react-markdown is a React library that converts Markdown text into
                                     HTML elements that your React application can display. */}
                                </div>
                        </div>

                        {/* course content Section */}
                    <div className='max-w-[830px] '>
                        <div className='flex flex-col gap-3'>
                                <p className='text-[28px] font-semibold'>
                                    Course Content
                                </p>
                            <div className='flex flex-wrap justify-between gap-2'>
                                    <div className='flex gap-2'>
                                        <span>
                                            {courseContent.length} section(s)
                                        </span>
                                        <span>
                                            {totalNoOfLectures} lectures(s)
                                        </span>
                                        <span>
                                            {response.data?.totalDuration} total length
                                        </span>
                                    </div>
                                <div>
                                    <button className='text-yellow-25'
                                 onClick={() => setIsActive([])}> 
                                    Collapse all sections 
                                </button>
                                </div>
                            </div>
                        </div>

                    {/* course details accordion */}
                    <div>
                        {
                            courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}/>
                            ))
                        }
                    </div>

                    {/* author details */}
                    <div className='mb-12 py-4'>
                        <p className='text-[28px] font-semibold'>Author</p>
                            <div className='flex items-center gap-4 py-4'>
                                <img src={instructor.image ? instructor.image :
                                     `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName}${instructor.lastName}`} alt="Author" className='h-14 w-14 rounded-full object-cover' />
                            <p className='text-lg'>{`${instructor.firstName}${instructor.lastName}`}</p>
                            </div>
                            <p className='text-richblack-50'>
                                {instructor?.additionalDetails?.about}
                            </p>
                    </div>
                </div>
            </div>
         </div>
        
        <Footer/>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}
