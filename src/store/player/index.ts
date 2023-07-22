import { create } from "zustand";
import { PlayMode } from "./types";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { SongType } from "@/api/types";

type State = {
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean; // 当前歌曲是否播放
  sequencePlayList: SongType[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: SongType[];
  playMode: PlayMode; // 播放模式
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  currentSong: SongType;
  percent: number; // 播放百分比
};

type Actions = {
  setCurrentSong: (song: any) => void;
  setCurrentIndex: (index: number) => void;
  setFullScreen: (open: boolean) => void;
  setPlayMode: (mode: PlayMode) => void;
  setPlaying: (newState: boolean) => void;
  setSequencePlayList: () => void;
  setPlayList: (list: any[]) => void;
  setShowPlayList: () => void;
  setPercent: (percent: number) => void;
};

const initialState: State = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [
    {
      id: 1416767593,
      name: "拾梦纪",
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
      },

      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
        },
        {
          id: 12578371,
          name: "金天",
        },
      ],
    },
  ], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [
    {
      id: 1416767593,
      name: "拾梦纪",
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
      },

      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
        },
        {
          id: 12578371,
          name: "金天",
        },
      ],
    },
  ],
  currentSong: {
    id: 1416767593,
    name: "拾梦纪",
    al: {
      id: 84991301,
      name: "拾梦纪",
      picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
    },

    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: "妖扬",
      },
      {
        id: 12578371,
        name: "金天",
      },
    ],
  },
  playMode: PlayMode.SEQUENCE, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表

  percent: 0,
};

const usePlayerStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,

    setCurrentSong: (song: any) =>
      set((state) => {
        state.currentSong = song;
      }),

    setCurrentIndex: (index: number) =>
      set((state) => {
        state.currentIndex = index;
      }),

    setFullScreen: (open: boolean) => {
      set((state) => {
        state.fullScreen = open;
      });
    },

    setPlayMode: (mode: PlayMode) =>
      set((state) => {
        state.playMode = mode;
      }),

    setPlaying: (newState: boolean) =>
      set((state) => {
        state.playing = newState;
      }),

    setSequencePlayList: () => set((state) => ({ ...state })),

    setPlayList: (list: any[]) =>
      set((state) => {
        state.playList = list;
      }),
    setShowPlayList: () => set((state) => ({ ...state })),
    setPercent: (percent) =>
      set((state) => {
        state.percent = percent;
      }),
  }))
);

export default usePlayerStore;
