import axiosInstance from "./config";
import { AlbumDetailType, ArtistData, LyricType, RankListType, SingerDetailType } from "./types";

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
export const getSingerListData = async (area: string, alpha: string, offset: number) => {
  try {
    const { data } = await axiosInstance.get<ArtistData>(
      `/artist/list?area=${area}&initial=${alpha.toLowerCase()}&offset=${offset}&limit=${30}`
    );

    return data;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 获取排行榜
export const getRankListRequest = async () => {
  try {
    const { data } = await axiosInstance.get<{ list: RankListType[] }>("/toplist/detail");

    return data;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 获取歌单的歌曲列表
export const getAlbumDetailRequest = async (id: string) => {
  try {
    const {
      data: { playlist },
    } = await axiosInstance.get<{ playlist: AlbumDetailType }>(`/playlist/detail?id=${id}`);

    return playlist;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 获取歌手详情相关数据
export const getSingerInfoRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.get<SingerDetailType>(`/artists?id=${id}`);

    return data;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 获取歌词
export const getLyricRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.get<LyricType>(`/lyric?id=${id}`);

    return data;
  } catch (err) {
    throw new Error(`request error: ${err}`);
  }
};

// 歌手种类, 歌手首字母
export { categoryTypes, alphaTypes, areaList } from "./static";
