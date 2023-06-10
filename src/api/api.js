import axios from "axios";

const baseURL = "https://user-managment-server.vercel.app";

export const api = (config = null) => {
  let headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };

  let axiosInstance = axios.create({
    baseURL: `${baseURL}/`,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 423) {
      }
      return Promise.reject(error.response.status);
    }
  );
  return axiosInstance(config);
};
