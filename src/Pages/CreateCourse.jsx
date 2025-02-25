import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { addCourseAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import { CourseContextApi } from "../contexts/CourseContext";


const CreateCourse = () => {
  const{courses,setCourses,fetchCourses}=useContext(CourseContextApi)
  
  
  
  const navigate=useNavigate()
  const [addCourse, setAddCourse] = useState({
    title: "",
    description: "",
    price: "",
    videoTitle: "",
    thumbImage:"",
    video: "",
    previewVideo: "",
  });
console.log(addCourse);

const [isFileStatus,setIsFileStatus]=useState(false)

useEffect(() => {
  if(addCourse.thumbImage.type=='image/png'||addCourse.thumbImage.type=='image/jpg'||addCourse.thumbImage.type=='image/jpeg'){
    setIsFileStatus(true)
  }
  else{
    setIsFileStatus(false)
    setAddCourse({ ...addCourse, thumbImage:""})
  }
  
}, [addCourse.thumbImage])


  const handleCreate=async(e)=>{
    e.preventDefault()
    const{title,description,price,videoTitle,thumbImage,video,previewVideo}=addCourse
    if(title&&description&&price&&videoTitle&&thumbImage&&video&&previewVideo){
      
     
      //req body
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("description",description)
      reqBody.append("price",price)
      reqBody.append("videoTitle",videoTitle)
      reqBody.append("thumbImage",thumbImage)
      reqBody.append("video",video)
      if (previewVideo) {
        reqBody.append("previewVideo", previewVideo);
      }
      //reqHeader
     // const token=sessionStorage.getItem("token")
     // if(token){
        const reqHeader={
          "content-type":{}
          // "authorization":`Bearer ${token}`
        }

        //api call
        try{
          const result=await addCourseAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            fetchCourses()
            toast.success("Course added successfully")
            setAddCourse({ title: "",
              description: "",
              price: "",
              videoTitle: "",
              thumbImage:"",
              video: "",
              previewVideo: ""})
              navigate('/instructorcourses')
          }
          else{
            toast.warning(result.response.data)
          }
          
          
  
        }
        catch(err){
          console.log(err);
          
        }
      //}
    }
    else{
      toast.warning("Enter all fileds completely")
    }
  }

  return (
    <div className="create-course-container container w-75 shadow mt-4">
      <h2 className="text-primary pt-3 text-center">Create New Course</h2>
      <form>
        <div className="form-group pt-3">
          <label htmlFor="courseTitle">Course Title</label>
          <input
            onChange={(e) =>
              setAddCourse({ ...addCourse, title: e.target.value })
            }
            type="text"
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(e) =>
              setAddCourse({ ...addCourse, description: e.target.value })
            }
            id="description"
            name="description"
            placeholder="Enter course description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            onChange={(e) =>
              setAddCourse({ ...addCourse, price: e.target.value })
            }
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Course Videos Section */}
        <div className="form-group">
          <label>Course Video</label>
          <div className="video-item">
            <input
              onChange={(e) =>
                setAddCourse({ ...addCourse, videoTitle: e.target.value })
              }
              type="text"
              placeholder="Video title"
            />
             <label>Thumb Image</label>
             <input
              onChange={(e) =>
                setAddCourse({ ...addCourse, thumbImage: e.target.files[0] })
              }
              type="file"
              
              required
            />
            { !isFileStatus&& <h6 className="text-warning">*upload only the following file type(png,jpg,jpeg) </h6>}
             <label>Video</label>
            <input
              onChange={(e) =>
                setAddCourse({ ...addCourse, video: e.target.files[0] })
              }
              type="file"
              accept="video/*"
              required
            />
          </div>
         
        </div>

        {/* Preview Video Section */}
        <div className="form-group">
          <label>Preview Video</label>
          <input
          
            type="file"
            accept="video/*"
            onChange={(e) =>
              setAddCourse({ ...addCourse, previewVideo: e.target.files[0] })
            }
            required
          />
          {/* {addCourse.previewVideo && (
            <div className="mt-3">
              <p>Preview:</p>
              <video
                src={addCourse.previewVideo}
                controls
                width="100%"
              ></video>
            </div>
          )} */}
        </div>

        <div className="text-center">
          <button onClick={handleCreate} type="submit" className="btn btn-info submit-btn mb-5">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
