import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseByIdAPI, updateCourseAPI } from "../services/allAPI";
import { toast } from "react-toastify";
import "./EditCourse.css";
import { CourseContextApi } from "../contexts/CourseContext";
import SERVER_URL from "../services/serverUrl";

const EditCourse = () => {
  const { fetchCourses } = useContext(CourseContextApi);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    videoTitle: "",
    thumbImage: "",
    video: "",
    previewVideo: "",
  });

  const [thumbPreview, setThumbPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [previewVideoPreview, setPreviewVideoPreview] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseByIdAPI(courseId);
        if (result.status === 200) {
          setCourse(result.data);
          setThumbPreview(`${SERVER_URL}/uploads/thumbnails/${result.data.thumbImage}`);
          setVideoPreview(`${SERVER_URL}/uploads/videos/${result.data.video}`);
          setPreviewVideoPreview(`${SERVER_URL}/uploads/previewVideos/${result.data.previewVideo}`);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("price", course.price);
    formData.append("videoTitle", course.videoTitle);

    if (course.thumbImage) formData.append("thumbImage", course.thumbImage);
    if (course.video) formData.append("video", course.video);
    if (course.previewVideo) formData.append("previewVideo", course.previewVideo);
    
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "content-type":"multipart/form-data",
        "authorization":`Bearer ${token}`
      }

    try {
      const result = await updateCourseAPI(courseId, formData,reqHeader);

      if (result.status === 200) {
        fetchCourses();
        toast.success("Course updated successfully");
        navigate("/instructorcourses");
      } else {
        toast.error("Failed to update course");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("An error occurred while updating");
    }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Course</h2>
      <form onSubmit={handleUpdate} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="form-control"
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Video Title</label>
          <input
            value={course.videoTitle}
            onChange={(e) => setCourse({ ...course, videoTitle: e.target.value })}
            className="form-control"
            placeholder="Enter video title"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className="form-control"
            rows="4"
            placeholder="Enter course description"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            value={course.price}
            onChange={(e) => setCourse({ ...course, price: e.target.value })}
            className="form-control"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Thumbnail Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setCourse({ ...course, thumbImage: e.target.files[0] });
              setThumbPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {thumbPreview && (
            <img src={thumbPreview} alt="Thumbnail Preview" className="img-fluid mt-2" />
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Video</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setCourse({ ...course, video: e.target.files[0] });
              setVideoPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {videoPreview && (
            <video src={videoPreview} controls className="img-fluid mt-2" />
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Preview Video</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setCourse({ ...course, previewVideo: e.target.files[0] });
              setPreviewVideoPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {previewVideoPreview && (
            <video src={previewVideoPreview} controls className="img-fluid mt-2" />
          )}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary mt-3 w-100">
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
