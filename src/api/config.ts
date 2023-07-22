import axios from "axios";

const BASEURL = "http://netease-cloud-music-9dkpwl9zj-xiaodye.vercel.app";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    throw new Error("响应拦截器：" + err);
  }
);

export default axiosInstance;
