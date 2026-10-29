import React from 'react'
import { ContactDetails } from '../components/core/ContactPage/ContactDetails'
import { ContactForm } from '../components/core/ContactPage/ContactForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

export const Contact = () => {
  return (
    <div>
        <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
            {/* contact details */}
            <div className='lg:w-[40%]'>
                <ContactDetails/>
            </div>

            {/* contact form */}
            <div className='="lg:w-[60%]'>
                <ContactForm/>
            </div>
            </div>

             <section className="bg-richblack-900 mt-28">
                <div className="mx-auto w-11/12 max-w-maxContent">
                <h2 className="mb-10 text-center text-3xl font-bold text-richblack-5">
                    Loved by Our Learners
                </h2>

          <ReviewSlider />
        </div>
      </section>
        <Footer/>
    </div>
  )
}
