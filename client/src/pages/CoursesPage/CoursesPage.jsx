import React from 'react'
import CoursesSection from '../../components/Courses/CoursesSection';
import Navbar from '../../components/Navbar/Navbar';

const CoursesPage = () => {
  return (
    <div>
       <Navbar/>
      <CoursesSection showViewAll={false} />
    </div>
  )
}

export default CoursesPage
