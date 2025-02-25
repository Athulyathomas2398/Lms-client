import React, { useContext, useEffect, useState } from 'react'
import './Courses.css'
import { Link } from "react-router-dom";
import { deleteCourseAPI, getAllCourseAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import { CourseContextApi } from '../contexts/CourseContext';

function Courses() {
   const {courses,setCourses,fetchCourses}=useContext(CourseContextApi)


    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
          const result = await deleteCourseAPI(courseId);
          if (result.status ==200) {
            await fetchCourses()
            toast.success("Course deleted successfully");
            
          } else {
            toast.error("Failed to delete course");
          }
        }
      };
    
    return (
        <>
            <div className="dashboard-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <h2 className="sidebar-title">Instructor</h2>
                    <ul className="sidebar-menu">
                        <li className="menu-item active  "><Link to={'/instructorDashboard'} className="text-decoration-none text-light" >Dashboard</Link></li>
                        <li className="menu-item"><Link to={'/instructorcourses'} className="text-decoration-none text-light" >Courses</Link></li>
                        <li className="menu-item"><Link to={'/'} className="text-decoration-none text-light" >Logout</Link></li>

                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Top Navbar */}
                    <div className="navbar ">
                        <h2 className="">Dashboard</h2>

                    </div>

                    <div className=''>
                        <div className="row">
                            <div className="col-lg-5">
                                <h2>All Courses</h2>

                            </div>
                            <div className="col-lg-2"></div>
                            <div className="col-lg-5 ">
                                <Link to={'/createcourse'}  className='btn btn-dark '>Add New Course</Link>
                            </div>
                        </div>
                    </div>

                    {/* All courses */}


                    <div class="table-container">
                        
                           
                            
                                <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    {/* <th>Students</th> */}
                                    <th>Price</th>
                                    <th colSpan={2}>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                         
                               {
                                courses?.length>0&&
                                courses?.map(items=>(
                                     
                                <tr >
                                <td data-label="Course">{items?.title}</td>
                                {/* <td data-label="Students">150</td> */}
                                <td data-label="Revenue">${items?.price}</td>
                                <td><Link to={`/editcourse/${items?._id}`}><i class="fa-solid fa-pen-to-square text-info"></i></Link></td>
                                <td data-label="Revenue"><Link><i class="fa-solid fa-delete-left " onClick={() => handleDelete(items?._id)}></i></Link></td>
                            </tr>
                                ))
                               }
                              
                              
                            
                            
                       
                         </tbody>
                        </table>
                            
                        
                    </div>

                </div>
            </div>

        </>
    )
}

export default Courses