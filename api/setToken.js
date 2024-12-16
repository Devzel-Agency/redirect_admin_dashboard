import { BACK_KEY } from "./variables";

const setToken = (value) => {
  const name = "token";
  localStorage.setItem("token", value + BACK_KEY);

};

export default setToken;
