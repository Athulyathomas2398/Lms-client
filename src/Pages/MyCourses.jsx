import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import SERVER_URL from "../services/serverUrl";
import "./MyCourses.css";
import { getPurchasedCoursesAPI } from "../services/allAPI";
import { CourseContextApi } from "../contexts/CourseContext";

const MyCourses = () => {
  const{courses}=useContext(CourseContextApi)
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
         const response = await getPurchasedCoursesAPI(user?._id);
        // setPurchasedCourses(response.data);
        const filteredCourses = response.data.filter(course => course && course.title); 
        setPurchasedCourses(filteredCourses);
      } catch (err) {
        console.error("Failed to fetch purchased courses:", err);
      }
    };

    if (user?._id) fetchPurchasedCourses();
  }, [user,courses]);

  return (
    <Container className="my-courses py-4">
      <Link to="/studentpage" className="btn btn-secondary mb-4">Back to Profile</Link>
      <h2 className="text-danger mb-4 text-center">My Purchased Courses</h2>

      {purchasedCourses.length > 0 ? (
        <Row className="g-4">
          {purchasedCourses.map((course,index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow course-card">
                <Card.Img
                  variant="top"
                  src={`${SERVER_URL}/uploads/thumbnails/${course?.thumbImage}`}
                  className="course-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-warning text-truncate">{course?.title}</Card.Title>
                  <Card.Text className="flex-grow-1 text-muted">{course?.description}</Card.Text>
                  <h5 className="fw-bold text-danger">${course?.price}</h5>
                  <Link to={`/coursecontent/${course?._id}`} className="btn btn-info mt-2">
                    View Course
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No purchased courses found.</p>
      )}
    </Container>
  );
};

export default MyCourses;
