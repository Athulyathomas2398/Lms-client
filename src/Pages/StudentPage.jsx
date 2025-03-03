
import React, { useContext, useEffect, useState } from "react";
import "./StudentPage.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HeaderStudent from "../Components/HeaderStudent";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";

import SERVER_URL from "../services/serverUrl";
import { CourseContextApi } from "../contexts/CourseContext";


const StudentPage = ({ }) => {
 
  const{courses,setCourses,fetchCourses}=useContext(CourseContextApi)
  const[user,setUser]=useState("")
//   console.log(user);
//  console.log("welcome",user);
    useEffect(() => {
      if(sessionStorage.getItem("user")){
        setUser(JSON.parse(sessionStorage.getItem("user")).username)
      }
      else{
        setUser("")
      }
     fetchCourses()
    }, [])
   useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
   
  return (
    <>
    <HeaderStudent/>
    <div className="student-page">
      <h1 data-aos="fade-right" className="text-danger mb-5 ms-5">Welcome <span className="text-info">{user?.split(" ")[0]}</span></h1>
      
      <div className="course-list">
       
        
            
            {
          courses?.length>0&&
          courses?.map(items=>(
            <div className="course-card"data-aos="fade-left" >
            <Card  style={{ width: '18rem' }}>
      <Card.Img variant="top" width={'200px'} height={'200px'} src={`${SERVER_URL}/uploads/thumbnails/${items?.thumbImage}`} />
      <Card.Body>
        <Card.Title className="text-warning ">{items.title}</Card.Title>
        <Card.Text>
         {items.description}
          <h3 className="fw-bold text-danger text-center mt-3" data-aos="fade-up">$ {items?.price}</h3>
        </Card.Text>
        {/* <Link  className="btn btn-primary me-5 w-25" >Pay</Link> */}
        <Link to={`/courseintroduction/${items?._id}`}  className=" btn btn-info w-100" >Preview</Link>
      </Card.Body>
    </Card>
          </div>
          ))
        }

        
      </div>
    </div>
    </>
  );
  
};

export default StudentPage;
