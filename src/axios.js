import axios from "axios";
const interceptorInstance = axios.create();

interceptorInstance.interceptors.request.use(
  (config) => {
    config.baseURL ='http://127.0.0.1:8000/';
    config.withCredentials = true;
    const user = JSON.parse(sessionStorage.getItem("authUser"));
    console.log(user);
    if (user?.token) {
      config.headers.Authorization = `token ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default interceptorInstance;

