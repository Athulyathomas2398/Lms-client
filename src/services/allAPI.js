import SERVER_URL from '../services/serverUrl'
import commonAPI from '../services/commonApi'

//api call for user register

export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//api call for user login
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//api call for adding course
export const addCourseAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/createcourse`,reqBody,reqHeader)
}
//api call for get all courses
export const getAllCourseAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getallcourses`,"",reqHeader)
}

// API call to get a course by ID
export const getCourseByIdAPI = async (courseId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/getcourse/${courseId}`, "", reqHeader);
  };

// Update course by ID
export const updateCourseAPI = async (courseId, reqBody,reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/updatecourse/${courseId}`,
    reqBody,reqHeader
    // { "Content-Type": "multipart/form-data" } // Important for FormData
  );
};
  
  // Delete course by ID
  export const deleteCourseAPI = async (id,reqHeader) => {
    return await commonAPI('DELETE', `${SERVER_URL}/deletecourse/${id}`,null,reqHeader);
  };

// API call to create an order for Razorpay payment
export const createOrderAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/create-order`, reqBody);
}; 

// Save purchase
export const savePurchaseAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVER_URL}/save-purchase`, reqBody);
};

// Get purchase stats
export const getPurchaseStatsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/purchase-stats`);
};



//  Get purchased courses for a specific student
export const getPurchasedCoursesAPI = async (studentId) => {
  return await commonAPI("GET", `${SERVER_URL}/purchased-courses/${studentId}`);
};