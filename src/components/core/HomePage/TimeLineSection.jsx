import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage from '../../../assets/Images/TimelineImage.png'


//create an array
const timeline= [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skill",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },

]

export const TimeLineSection = () => {
  return (
    <div className='flex flex-row gap-15 items-center justify-between py-5'>
        <div className='w-[45%] flex flex-col gap-2 items-start pr-20'>{
             timeline.map((element,index) => {
                return(
                    <div className='flex flex-row gap-5 ' key={index}>
                        <div className='flex flex-col items-center gap-3 ' >
                            <div className='h-[50px] w-[50px] bg-white rounded-full flex flex-col items-center gap-5'>
                            <img src={element.Logo} className='flex items-center py-3 '/>
                             
                        </div>
                        {/* Dotted line */}
                             {index !== timeline.length - 1 && (
                            <div className="h-8 border-l-2 border-dotted border-richblack-100"></div>
                             )}

                        </div>
                        

                        <div>
                            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                            <p className='text-base'>{element.description}</p>
                        </div>
                        
                    </div>
                    
                )

           })
            
            }
          

        </div>

        <div className='relative shadow-blue-100'>
            <img src={timeLineImage} alt="image" className='border-y-white' />

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-9
            items-center translate-x-40 -translate-y-16'>
                <div className='flex flex-row items-center border-r border-caribbeangreen-500 gap-3 px-7'>
                    <h1 className='font-bold text-3xl'>10</h1>
                    <p className='text-caribbeangreen-300 text-xs'>years <br />experience</p>
                </div>

                <div className='flex flex-row px-7 gap-3'>
                    <h1 className='font-bold text-3xl'>250</h1>
                    <p className='text-caribbeangreen-300 text-xs'>types of <br />courses</p>
                </div>
            </div>
        </div>
    </div>
  )
}
