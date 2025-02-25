
import axios from "axios";

const commonAPI = async (method, url, reqBody = "", reqHeader = {}) => {
  try {
    const config = {
      method,
      url,
      headers: reqHeader, // Pass custom headers
      data: reqBody, // Pass FormData or JSON body
    };

    return await axios(config);
  } catch (err) {
    return err.response;
  }
};

export default commonAPI;
