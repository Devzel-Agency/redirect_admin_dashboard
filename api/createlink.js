import axiosInstance from "./axiosinstance";
import setToken from "../api/setToken";
import getToken from "./getToken";


const Createnewlink = async (name, original_url) => {
    const token=getToken()
    const headers = {
      authorization: `Bearer ${token}`,
    };
  const requestData = {
    name: name,
    original_url: original_url,
  };
  try {
    const response = await axiosInstance.post("/admin/createLink", requestData, {
        headers,
      });
   
    return response.data;
  } catch (error) {

    return { error: error.response.data };

  }
};
export default Createnewlink;