import React from 'react'
import { CTAButton } from './Button'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'

export const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 mx-auto mt-36 mb-20'>
        <div className=' flex flex-col items-center justify-center'>
            <p className='text-3xl font-bold'>Your swiss knife for <span className='font-bold text-richblue-500 bg-gradient-to-r
             from-caribbeangreen-100 to-caribbeangreen-50 bg-clip-text
              text-3xl text-transparent'>learning any language</span></p>
            
              <p className='text-center  mt-3 w-[60%] text-base'>Using spin making learning multiple languages easy,
                 with 20+ languages realistic voice-over,
                   progress tracking, custom schedule and more.
              </p>
        </div>

        <div className='flex flex-row items-center justify-center mt-2 mx-6 '>
            <img src={knowYourProgress} alt="knowYourProgress" className='translate-x-32'/>
            <img src={compareWithOthers} alt="compareWithOthers" className='z-10' />
            <img src={planYourLessons} alt="planYourLessons" className='-translate-x-40 z-10' />
            
        </div>

        <div className='flex items-center justify-center mt-6'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

        </div>
    </div>
  )
}
