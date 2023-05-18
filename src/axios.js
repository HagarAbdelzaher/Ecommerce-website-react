import axios from "axios";
// import { useSelector } from "react-redux";

// // function CustomAxios(){
// //     const user = useSelector((state) => state.user.user);

// //    return  axios.create(
// //     {
// //         baseURL:'http://127.0.0.1:8000/',
// //         withCredentials:true,
// //         headers:{
// //             'Content-Type': 'application/json',
// //             Authorization: `token ${user.token}`,
// //         }
// //     }
// // )
// // }

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

interceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default interceptorInstance;

