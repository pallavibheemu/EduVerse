import React from 'react'
import {FaArrowRight} from "react-icons/fa";
import { Link } from 'react-router-dom';
import {CTAButton} from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import { CodeBlock } from '../components/core/HomePage/CodeBlock';
import { TimeLineSection } from '../components/core/HomePage/TimeLineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import instructor from '../../src/assets/Images/Instructor.png'
import  Footer from '../components/common/Footer';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
export const Home = () => {
  return (
   <div className='relative mx-auto w-[100%]'>   
        {/* {section 1} */}
        <div className= 'relative mx-auto flex flex-col w-11/12 max-w-[1200px] items-center text-white justify-between '>
            <Link to = {"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p> Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>


            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your Future with 
                <span className='text-blue-400'> Coding Skills</span>
            </div>
            <p className='w-[90%] text-center mt-5 text-richblack-200'>With our coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on-projects, quizzes, and personalized feedback from instructors</p>

            <div className='flex flex-row items-center mt-8 gap-6 z-10'>
                <CTAButton active={true} linkto={"/signup"}>
                Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                Book a Demo
                </CTAButton>


            </div>



             <div className='flex justify-center my-10'>
                 <div className="absolute
             left-1/2
            top-1/1
             -translate-x-1/2
             -translate-y-1/2
             h-[200px]
             w-[500px]
             bg-blue-500
             blur-[120px]
             opacity-70">
  </div>
             <div className='z-10 realtive my-14 w-[90%] shadow-[16px_16px_0px_white] '>
                <video autoPlay muted loop>
                    <source src={Banner}/>
                </video>

            </div>
                
            </div>  
   

            {/* code section 1 */}
            <div>
                <CodeBlock position={"lg:flex-row"}heading={
                    <div className='font-semibold text-4xl'>
                        Unlock your 
                        <span className='text-blue-400'> Coding Potential </span>
                         with our online courses.
                    </div>
                } description={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                } btn1={
                    {
                        active:true,
                        text:"Try it Yourself",
                        linkto:"/signup"
                    }
                } btn2={
                    {
                        active:false,
                        text:"Learn More",
                        linkto:"/login"
                    }
                } codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1>\n<ahref="/">Header</a>\n</h1>\n<nav>`}/>
            </div>

            {/* code section 2 */}
            <div>
                <CodeBlock position={"lg:flex-row-reverse"}heading={
                    <div className='font-semibold text-4xl'>
                        Start
                        <span className='text-blue-400'> Coding in Seconds </span>
                    </div>
                } description={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                } btn1={
                    {
                        active:true,
                        text:"Continue Lesson",
                        linkto:"/signup"
                    }
                } btn2={
                    {
                        active:false,
                        text:"Learn More",
                        linkto:"/login"
                    }
                } codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1>\n<ahref="/">Header</a>\n</h1>\n<nav>`}/>
            </div>

                <ExploreMore/>

        </div>

        {/* {section 2} */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[270px]'>
                <div className='mx-auto w-11/12 max-w-maxContentTab flex flex-col justify-center items-center gap-5'>
                    <div className='h-[150px]'></div>
                     <div className='flex flex-row gap-5  items-center text-white'>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                    Explore Full Catalog
                    <FaArrowRight/>
                    </div>
                     
                    </CTAButton>
                    <CTAButton active={false} linkto={"/signup"}>
                   Learn More
                    </CTAButton>
                </div>

                </div>
               

            </div>


            <div className='mx-auto w-11/12 max-w-[1200px] flex flex-col items-center gap-10'>
                <div className='flex flex-row items-center justify-between my-10 px-5 gap-5'>
                    <div className='font-semibold text-4xl w-[55%] gap-5 '>
                        Get the skills you need for a 
                        <span className='font-bold text-richblue-500 bg-gradient-to-r from-caribbeangreen-100 to-caribbeangreen-50 bg-clip-text text-transparent'> job that is in demand</span>
                    </div>
                    <div className='flex flex-col gap-10 w-[50%] items-start mt-5 text-base'>
                        <p className='text-[16px]'>The Modern Eduverse dictates its own terms. Today, to be a competitive specialist requires more than professional skills </p>
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    </div>
                </div>

                <TimeLineSection/>

                <LearningLanguageSection/>

            </div>
        </div>


        {/* {section 3} */}
        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-col items-center mt-20 mb-14'>
        <div className='flex flex-row justify-between gap-10 items-center'>
            <div className=' relative w-[50%] flex flex-row items-center justify-center'>
                <div className="absolute -top-2 left-[0.4%] w-[93%] h-[97%] border-t-8 border-l-8 border-white"></div>
                <img src={instructor} alt="instructor" className='realtive z-10 w-[580px] h-[545px]'  />
            </div>
             

            <div className='w-[40%] flex flex-col justify-center items-start gap-12'>
                 <div className='text-white text-3xl font-bold '>
                    Become an 
                    <p className='text-blue-400'>instructor</p>

              <p className='w-[90%] text-base text-richblack-300 mt-3'>Instructors from around the world teach millions of students on EduVerse. We provide the tools and skills to teach what you love.</p>
                </div>


                
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row justify-center items-center gap-2'>
                    Start Teaching Today
                    <FaArrowRight/>
                    </div>
                    </CTAButton>


            </div>
         </div>
        </div>

         <section className="bg-richblack-900">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <h2 className="mb-3 text-center text-3xl font-bold text-richblack-5">
            Reviews from Our Learners
          </h2>

          <p className="mb-10 text-center text-richblack-300">
            See what our students say about their learning experience.
          </p>

          <ReviewSlider />
        </div>
      </section>



        {/* footer */}
        <Footer/>

    </div>
  )
}







