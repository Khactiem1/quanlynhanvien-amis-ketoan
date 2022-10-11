import axios from "axios";
import configs from "../configs/index";
const axiosAPI = axios.create({
  baseURL: configs.baseUrl,
  timeout: 5000,
});

//chưa cần đính token vào header
// axiosAPI.interceptors.request.use(
//   function (config) {
//     config.headers.tokenByClass = configs.tokenByClass;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

axiosAPI.interceptors.request.use(
  function (config) {
    config.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    return config;
  },
);

axiosAPI.interceptors.response.use(
  function (response) {
    return response.data;
  },
);

export default axiosAPI;