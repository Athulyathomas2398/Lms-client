import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CourseContextApi } from "../contexts/CourseContext";
import "./CourseContent.css";
import { getCourseByIdAPI } from "../services/allAPI";
import SERVER_URL from "../services/serverUrl";

function CourseContent() {
  const{courseId}=useParams()
  const [course, setCourse] = useState({});
   console.log("cjs", course);
 
   useEffect(() => {
     const fetchCourseDetails = async () => {
       try {
         const result = await getCourseByIdAPI(courseId);
         if (result.status === 200) {
           setCourse(result.data);
         } else {
           console.error("Failed to fetch course details.");
         }
       } catch (err) {
         console.error("Error fetching course details:", err);
       }
     };
 
     fetchCourseDetails();
   }, [courseId]);
 
   const { title,videoTitle, description, previewVideo,price ,video} = course

  return (
    <div className="course-content-container">
      {/* Success Message */}
      <div className="success-header text-center py-4">
        <h1>Congratulations on Unlocking the Full Course! 🎉</h1>
        <p className="success-description">
          You're now ready to dive into the course content..
        </p>
      </div>

      <div className="row content-wrapper  d-flex">
        {/* Video List Section */}
        <div className="video-list col-lg-4 col-md-4">
          <h3>Course Videos</h3>
          <ul className="list-group">
            
              <li
              
              >
                <h5>{title}</h5>
                <p className="video-description">{description}</p>
              </li>
            
          </ul>

          <Link to={'/studentpage'} className="btn btn-danger">Back to Profile</Link>
        </div>

        {/* Video Player Section */}
        <div className="video-player  col-lg-8 col-md-8 text-center">
          <h3>{videoTitle}</h3>
          <video
            width="100%"
            height="400px"
            controls
            >
            {video ? (
              <source src={`${SERVER_URL}/uploads/videos/${video}`} type="video/mp4" />
            ) : (
              <p>Loading preview video...</p>
            )}
          
            Your browser does not support the video tag.
          </video>
          <p className="mt-3">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
