// VideoPreviewPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VideoPreviewPage.css";

const VideoPreviewPage = ({ courses }) => {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);
  const video = course?.videos.find((v) => v.id === videoId);

  const handlePayment = () => {
    alert("Proceeding to payment...");
    navigate("/payment");
  };

  return (
    <div className="video-preview-page">
      <h1>Preview: {video?.title}</h1>
      <video controls>
        <source src={video?.previewUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={handlePayment} className="payment-btn">
        Unlock Full Course
      </button>
    </div>
  );
};

export default VideoPreviewPage;
