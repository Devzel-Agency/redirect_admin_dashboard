import axiosInstance from "./axiosinstance";
import getToken from "./getToken";
import logout from "./logout";
const getuser = async () => {
  const token=getToken()
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/admin/getuser", {
      headers,
    });

    return response.data;
  } catch (error) {
    //console.log(error);
    logout()
    return null;
  }
};
export default getuser;
