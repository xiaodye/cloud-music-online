import axios from "axios";

const BASEURL = "http://netease-cloud-music-9dkpwl9zj-xiaodye.vercel.app";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err, "网络错误");
  }
);

export default axiosInstance;
