import axiosInstance from "./axiosinstance";
import setToken from "../api/setToken";


const userlogin = async (email, password) => {
  const requestData = {
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post("/admin/login", requestData);
    setToken(response.data.token)
    return response.data;
  } catch (error) {

    return { error: error.response.data };

  }
};
export default userlogin;
