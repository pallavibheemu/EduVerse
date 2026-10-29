import React from 'react'
import { CTAButton } from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

export const CodeBlock = ({position,heading, description, btn1, btn2, codeblock}) => {
  return (
    <div className={`flex ${position}  justify-between my-20 gap-20`}>

        {/* section1 */}
        <div className='w-[50%] flex flex-col gap-8 '>
            {heading}
            <div className='text-richblack-300'> {description}</div>
           

           <div className='flex flex-row gap-7 mt-7'>
            <CTAButton active={btn1.active} linkto={btn1.linkto}>
                <div className='flex gap-2 items-center'>
                     {btn1.text}
                    <FaArrowRight/>
                </div>
            </CTAButton>


            <CTAButton active={btn2.active} linkto={btn2.linkto}>
                     {btn2.text}
            </CTAButton>
         </div>


        </div>

        {/* section 2 */}
        <div className='relative h-fit flex flex-row w-[100%] px-14 py-4 lg:w-[500px]'>
            <div className=" absolute w-[373px] h-[257px] rounded-full opacity-50 blur-[120px] bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)]"></div>

            <div className='text-center flex flex-col w-[10%] font-inter text-richblack-400 font-black'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className='flex flex-col gap-2 font-bold pr-2'>
                <TypeAnimation
                sequence={[codeblock,2000,""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}

                style={
                    {
                        whiteSpace:"pre-line",
                        display:'block',
                    }
                }
                />
                
            </div>
  
  
  
        </div>



    </div>
  )
}
