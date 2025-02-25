import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { getAllCourseAPI } from '../services/allAPI'
export const CourseContextApi=createContext()
function CourseContext({children}) {
    const [courses,setCourses]=useState([])

    const fetchCourses=async()=>{
      const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "content-type":"application/json",
      "authorization":`Bearer ${token}`
      }
        try{
            const result=await getAllCourseAPI(reqHeader)
            if(result.status==200){
                setCourses(result.data)
            }
            

        }
        catch(err){
            console.log(err);
            
        }
      }
    }


    useEffect(() => {
      fetchCourses()
    }, [])
    
  return (
    <>
    
    <CourseContextApi.Provider value={{courses,setCourses,fetchCourses}}>
        {children}

    </CourseContextApi.Provider>
    </>
  )
}

export default CourseContext