import getToken from "./getToken";
import axiosInstance from "./axiosinstance";


const Getalllinks = async () => {
    const token = getToken()
    const headers = {
        authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.get("/admin/getalllinks", {
            headers,
        });

        return response.data;
    } catch (error) {

        return { error };

    }
}

export default Getalllinks
