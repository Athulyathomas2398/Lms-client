import React, { useContext, useEffect, useState } from "react";
import "./CourseIntroduction.css";

import SERVER_URL from "../services/serverUrl";
import { createOrderAPI, getCourseByIdAPI, savePurchaseAPI } from "../services/allAPI";
import { useNavigate, useParams } from "react-router-dom";
import { authContextApi } from "../contexts/AuthContext";



function CourseIntroduction() {
  const { user, setUser } = useContext(authContextApi)
  
  

  const navigate = useNavigate()
  const { courseId } = useParams();  // Get courseId from URL
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

  const { title, description, previewVideo, price } = course


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");  // Create a new script element
      script.src = "https://checkout.razorpay.com/v1/checkout.js";  //  Set the script source
      script.onload = resolve;  // Resolve the promise once loaded successfully
      script.onerror = () => alert("Razorpay SDK failed to load. Are you online?");  // Handle loading errors
      document.body.appendChild(script);  //  Append the script to the body to load it
    });
  };


  const handlePayAndContinue = async () => {
    await loadRazorpayScript();

    try {
      const result = await createOrderAPI({ amount: price }); // Razorpay accepts amount in paise
      if (result.status !== 200) {


        alert("Failed to create order. Please try again.");
        return;
      }

      const { amount, id: order_id, currency } = result.data.order;

      const options = {
        key: "rzp_test_NjwasSiiEWWpkG", // Replace with your Razorpay Key ID
        amount,
        currency,
        name: "LMS Course Purchase",
        description: `Purchase of ${title}`,
        order_id,
        handler:async function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          console.log(result.data);
          
          // Save purchase to backend
          await savePurchaseAPI({
            courseId,
            studentId: user._id,
            amount: price,
            paymentId: response.razorpay_payment_id,
          });
          // Handle success (e.g., verify payment or update user course access)
          
          navigate(`/coursecontent/${courseId}`)
        },
        prefill: {
          name: user.username,
          email: user.email,
          // contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };
  return (
    <div className="course-intro-container container">
      {/* Course Introduction Section */}
      <div className="course-header text-center py-4">
        <h1 className="course-title text-primary">{title}</h1>
        <p className="course-description text-dark">
          {description}
        </p>

      </div>

      {/* Video Content Section */}
      <div className="row">
        <div className="col-lg-7 course-video-section d-flex justify-content-center my-5">
          <div className="video-wrapper">
            <video
              width="600"
              height="310"
              controls
              poster="https://via.placeholder.com/600x340.png?text=Course+Preview" // Optional placeholder
            >
              {previewVideo ? (
                <source src={`${SERVER_URL}/uploads/previewVideos/${previewVideo}`} type="video/mp4" />
              ) : (
                <p>Loading preview video...</p>
              )}
              Your browser does not support the video tag.
            </video>
            <div className="preview-status mt-2">

              <p className="text-muted">Click to play preview</p>

            </div>
          </div>
        </div>

        {/* Pay to Continue Section */}
        <div className="col-lg-5 mt-5 pt-5 pay-section text-center">
          <h2 className="pay-header text-warning">Unlock the Full Course</h2>
          <p className="pay-description">
            Get access to all course content, downloadable resources, and a certificate of completion.
          </p>
        
            <button className="btn btn-primary btn-lg" onClick={handlePayAndContinue}>
              Pay to Continue
            </button>
          
        </div>
      </div>
    </div>
  );
}

export default CourseIntroduction;
