import axios from "axios";

const BASEURL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, "网络错误");
  }
);

export default axiosInstance;
