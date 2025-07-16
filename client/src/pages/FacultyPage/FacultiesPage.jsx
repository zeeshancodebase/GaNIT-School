import React from 'react'
import FacultiesSection from '../../components/FacultiesSection/FacultiesSection'
import Navbar from '../../components/Navbar/Navbar'

const FacultiesPage = () => {
  return (
    <div>
         <Navbar/>
      <FacultiesSection showViewAll={false}/>
    </div>
  )
}

export default FacultiesPage
