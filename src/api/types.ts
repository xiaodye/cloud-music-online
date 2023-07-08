export type Artist = {
  id: number;
  accountId: number;
  name: string;
  picUrl: string;
};

export type ArtistData = {
  artists: Artist[];
  code: number;
};

export type RankListType = {
  id: string;
  coverImgUrl: string;
  tracks: { first: string; second: string }[];
  updateFrequency: string;
};

export type AlbumDetailType = {
  id: string;
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  tracks: {
    name: string;
    ar: { name: string }[];
    al: { name: string };
  }[];
};

export type SingerDetailType = {
  artist: {
    name: string;
    picUrl: string;
  };
  hotSongs: {
    name: string;
    ar: { name: string }[];
    al: {
      name: string;
    };
  }[];
};
