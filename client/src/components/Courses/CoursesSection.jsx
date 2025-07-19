import React from "react";
import "./Courses.css";
import { Link} from "react-router-dom";
import {
  FaBrain,
  FaStar,
  // FaClock,
  FaArrowRight,
  FaPython,
  FaJava,
  // FaFigma,
  // FaUserGraduate,
  FaArrowLeft,
} from "react-icons/fa6";
// import {  FaShieldAlt } from "react-icons/fa";
// import { TbBinaryTree, TbWorldCode } from "react-icons/tb";
// import { SiTensorflow, SiAmazonwebservices, SiJenkins } from "react-icons/si";
import Avatar from "../../components/Avatar/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const coursesData = [
  {
    title: "Java with Full Stack Development",
    info: "12 Weeks • You will learn Java With Full stack Development",
    faculty: "Zeeshan Patel",
    reviews: "4.7 (310 reviews)",
    duration: "16 weeks",
    students: "980",
    icon: <FaJava />,
  },{
    title: "Python Programming Masterclass",
    info: "You will learn Python",
    faculty: "Neha Singh",
    reviews: "4.8 (420 reviews)",
    duration: "8 weeks",
    students: "1,245",
    icon: <FaPython />,
  },
  {
    title: "QuantXpert ( Mastering Quantitative Aptitude )",
    info: "12 Weeks • From Basics to Advanced",
    faculty: "Fahim Makandar",
    reviews: "4.9 (530 reviews)",
    duration: "12 weeks",
    students: "1,560",
    icon: <FaBrain />,
  },
  
  // {
  //   title: "Full Stack Web Development",
  //   info: "12 Weeks • 1,560 Students",
  //   faculty: "Zeeshan Patel",
  //   reviews: "4.9 (530 reviews)",
  //   duration: "12 weeks",
  //   students: "1,560",
  //   icon: <TbWorldCode />,
  // },
  // {
  //   title: "Aptitude & Logical Reasoning",
  //   info: "12 Weeks • 1,560 Students",
  //   faculty: "Fahim Makandar",
  //   reviews: "4.6 (290 reviews)",
  //   duration: "12 weeks",
  //   students: "1,560",
  //   icon: <FaBrain />,
  // },
  // {
  //   title: "Data Structures & Algorithms",
  //   info: "10 Weeks • 1,120 Students",
  //   faculty: "Anjali Mehta",
  //   reviews: "4.8 (400 reviews)",
  //   duration: "10 weeks",
  //   students: "1,120",
  //   icon: <TbBinaryTree />,
  // },
  // {
  //   title: "Machine Learning with Python",
  //   info: "12 Weeks • 980 Students",
  //   faculty: "Dr. Ankur Mathur",
  //   reviews: "4.9 (470 reviews)",
  //   duration: "12 weeks",
  //   students: "980",
  //   icon: <SiTensorflow />,
  // },
  // {
  //   title: "UI/UX Design Bootcamp",
  //   info: "8 Weeks • 860 Students",
  //   faculty: "Sneha Kapoor",
  //   reviews: "4.7 (280 reviews)",
  //   duration: "8 weeks",
  //   students: "860",
  //   icon: <FaFigma />,
  // },
  // {
  //   title: "Cybersecurity Essentials",
  //   info: "10 Weeks • 740 Students",
  //   faculty: "Rohan Deshmukh",
  //   reviews: "4.6 (220 reviews)",
  //   duration: "10 weeks",
  //   students: "740",
  //   icon: <FaShieldAlt />,
  // },
  // {
  //   title: "Cloud Computing with AWS",
  //   info: "9 Weeks • 910 Students",
  //   faculty: "Tanvi Joshi",
  //   reviews: "4.7 (310 reviews)",
  //   duration: "9 weeks",
  //   students: "910",
  //   icon: <SiAmazonwebservices />,
  // },
  // {
  //   title: "DevOps and CI/CD Practices",
  //   info: "11 Weeks • 675 Students",
  //   faculty: "Siddharth Rane",
  //   reviews: "4.6 (190 reviews)",
  //   duration: "11 weeks",
  //   students: "675",
  //   icon: <SiJenkins />,
  // },
];

const CoursesSection = ({ showViewAll = true }) => {
  return (
    <>
      {/* Courses */}
      <section id="courses" className="courses">
        <div className="container">
          <div className="tracks-title-container">
            <h2 className="courses-tracks-title">
              Top <span className="highlight">Courses</span>
            </h2>
            <p>
              Our top courses, expertly crafted to support your learning journey
            </p>
          </div>
          <div className="carousel-wrapper">
            <button className="custom-swiper-button prev" id="customPrevBtn">
              <FaArrowLeft />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation={{
                nextEl: "#customNextBtn",
                prevEl: "#customPrevBtn",
              }}
              pagination={{ clickable: true }}
            >
              {coursesData.map((course, index) => (
                <SwiperSlide key={index}>
                  <div className="course-card">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-body">
                      <div
                        style={{
                          background: "#f9f9f9",
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                          padding: "16px",
                          color: "#111",
                        }}
                      >
                        <h3 className="course-title">{course.title}</h3>
                        <p style={{margin:"0"}}>{course.info}</p>
                        <div className="faculty-profile">
                          <Avatar size={48} />
                          <div className="course-faculty">
                            <p>{course.faculty}</p>
                            <p>
                              <FaStar /> {course.reviews}
                            </p>
                          </div>
                        </div>
                        {/* <p className="course-info">
                          <span className="course-duration">
                            <FaClock /> {course.duration}
                          </span>
                          <span className="course-students">
                            <FaUserGraduate /> {course.students} Students
                          </span>
                        </p> */}
                        <a href="/" className="btn small">
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-swiper-button next" id="customNextBtn">
              <FaArrowRight />
            </button>
          </div>
          {showViewAll && (
          <Link to="/courses" className="view-all-btn">
            View all Courses
            <FaArrowRight />
          </Link>)}
        </div>
      </section>
    </>
  );
};

export default CoursesSection;
