import axiosInstance from "./config";
import { ArtistData } from "./types";

// 轮播图
export const getBannerListData = async () => {
  const { data } = await axiosInstance.get("/banner");
  return data;
};

// 推荐歌单
export const getRecommendListData = async () => {
  const { data } = await axiosInstance.get("/personalized");
  return data;
};

// 热门歌手
export const getHotSingerListData = async (count: number) => {
  const { data } = await axiosInstance.get(`/top/artists?offset=${count}`);
  return data;
};

// 根据首字母获取相应歌手
export const getSingerListData = async (category: string, alpha: string, count: number) => {
  try {
    const { data } = await axiosInstance.get<ArtistData>(
      `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}&limit=${30}`
    );

    return data;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 获取排行榜
export const getRankListRequest = () => {
  return axiosInstance.get<any>(`/toplist/detail`);
};

// 歌手种类, 歌手首字母
export { categoryTypes, alphaTypes } from "./static";
