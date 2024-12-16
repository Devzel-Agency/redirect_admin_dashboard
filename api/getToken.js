import { BACK_KEY } from "./variables";

 const getToken = (token1) => {

    let tokenWithKeys;
    if(token1){
        tokenWithKeys = token1;
    }
    else{
    tokenWithKeys = localStorage.getItem("token");
    }
    if (!tokenWithKeys) return null;

    // Assuming FRONT_KEY and BACK_KEY have fixed lengths
    const token = tokenWithKeys.substring(0, tokenWithKeys.length - BACK_KEY.length);
    return token;
};
export default getToken
