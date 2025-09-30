import React from 'react'
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection'
import Navbar from '../../components/Navbar/Navbar'

const Testimonials = () => {
  return (
    <div>
         <Navbar/>
      <TestimonialsSection  showViewAll = {false }/>
    </div>
  )
}

export default Testimonials
