export type Artist = {
  accountId: number;
  name: string;
  picUrl: string;
};

export type ArtistData = {
  artists: Artist[];
  code: number;
};
