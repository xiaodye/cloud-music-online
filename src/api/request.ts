import axiosInstance from "./config";

export const getBannerListData = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListData = () => {
  return axiosInstance.get("/personalized");
};
