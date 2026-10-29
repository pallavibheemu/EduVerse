import React from 'react'
import { IoMdContacts } from "react-icons/io"
import { FaBookOpen } from "react-icons/fa";

const CourseCard = ({index,cardData,currentCard,setCurrentCard,}) => {
    const isActive = currentCard === cardData.heading;
     return (
        <div
            onClick={() => setCurrentCard(cardData.heading)}
            className={`relative flex flex-col gap-7 cursor-pointer transition-all duration-200 w-[341px] h-[300px] ${
                isActive
                    ? "bg-white text-black"
                    : "bg-richblack-800 text-white"
            }` 
        } key={index}
        >
        <div className={`${isActive? "absolute -right-2 w-[95%] h-[95%] top-6 border-b-8 border-r-8 border-yellow-100":"absolute -right-2 w-[95%] h-[95%] top-6 "}`}></div>

            <div className='flex flex-col px-5 py-7 gap-3'>

            <h2 className='font-semibold'>{cardData.heading}</h2>
            <p className='text-richblack-400'>{cardData.description}</p>
            

            <div className='flex flex-row my-24 justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                 <IoMdContacts />{cardData.level}
                 </div>
                 <div className='flex flex-row gap-1 items-center'>
                <FaBookOpen />
                {cardData.lessionNumber}
               </div>
            </div>
            </div>
            
        </div>
    );
};

export default CourseCard;