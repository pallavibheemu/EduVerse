import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabs= [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths",
]
export const ExploreMore = () => {
    const [currentTab, setCurrentTab]= useState(tabs[0]);
    const [currentCourses, setCurrentCourses]= useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard]= useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result= HomePageExplore.filter((course)=> course.tag === value); //here you can put result or anything instead of course
        setCurrentCourses(result[0].courses); //result would only have one value, so we access it by 0, as it is present in the 0th index
        setCurrentCard(result[0].courses[0].heading);

    }   
  return (
    <div className='relative w-11/12 max-w-[1200px] flex flex-col items-center translate-y-20 z-10'>
        <div className='text-4xl font-bold flex flex-col items-center mb-8 mt-32'>
            <h1>Unlock the <span className='text-blue-400'>Power of Code</span></h1>
            <p className='text-sm text-richblack-400'>Learn to build anything that you can imagine</p>
        </div>


        <div className='flex flex-row bg-richblack-800 rounded-full justify-between mb-5 w-[60%]'>
            {
                tabs.map((element,index) => {
                    return(
                        <div className={`text-[16px] ${currentTab===element?" bg-richblack-900 text-richblack-5 font-medium":" text-richblack-500"} rounded-full transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 px-5 py-3 `} key={index}
                        onClick={()=> {setMyCards(element)}}
                        >{element}
                        </div>                    
                    )
                })
            }
            
        </div>

            <div className='lg:h-[150px]'></div>



        <div className='flex flex-row gap-10 -mt-28'>
            {
                currentCourses.map((course) => { //here element-course which is selected, index=course heading
                    return(
                        <CourseCard
                        key={course.heading}
                        cardData={course}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }

        </div>

    </div>
  )
}
