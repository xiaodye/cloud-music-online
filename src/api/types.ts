// 艺术家（歌手）类型
export type QRKeyType = {
  code: number;
  unikey: string;
};

export type QRImgType = {
  qrimg: string;
  qrurl: string;
};

export type QRCheckType = {
  code: 800 | 801 | 802 | 803;
  cookie: string;
  message: string;
  nickname: string;
  avatarUrl: string;
};

export type Artist = {
  id: number;
  accountId: number;
  name: string;
  picUrl: string;
};

// 艺术家接口
export type ArtistData = {
  artists: Artist[];
  code: number;
  more: boolean;
};

// 排行榜
export type RankListType = {
  id: string;
  coverImgUrl: string;
  tracks: { first: string; second: string }[];
  updateFrequency: string;
};

// 歌单详情
export type AlbumDetailType = {
  id: string;
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  tracks: SongType[];
};

// 歌手详情
export type SingerDetailType = {
  artist: {
    name: string;
    picUrl: string;
  };
  hotSongs: SongType[];
};

// 歌词数据类型
export type LyricType = {
  lrc: {
    lyric: string;
    version: number;
  };
};

// 歌曲类型
export type SongType = {
  id: number;
  name: string;
  // 歌曲信息
  al: {
    id: number;
    name: string;
    picUrl: string;
  };

  // 歌手信息
  ar: {
    id: number;
    name: string;
  }[];

  // 歌曲时长 单位: s
  dt: number;
};
