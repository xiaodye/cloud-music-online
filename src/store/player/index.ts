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
  currentTime: number; // 当前歌曲已播放时长，单位: s
  showPlayList: boolean; // 是否展示播放列表
  currentSong: SongType;
  percent: number; // 播放百分比
};

type Actions = {
  setCurrentSong: (song: SongType) => void;
  setCurrentIndex: (index: number) => void;
  setCurrentTime: (newTime: number) => void;
  setFullScreen: (open: boolean) => void;
  setPlayMode: (mode: PlayMode) => void;
  setPlaying: (newState: boolean) => void;
  setSequencePlayList: (list: SongType[]) => void;
  setPlayList: (list: SongType[]) => void;
  setShowPlayList: (show: boolean) => void;
  setPercent: (percent: number) => void;

  deleteSong: (currentIndex: number) => void;
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
  currentTime: 0,
  playMode: PlayMode.SEQUENCE, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置，一开始不应该播放，所以置为 -1
  showPlayList: false, // 是否展示播放列表

  percent: 0,
};

const usePlayerStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,

    setCurrentSong: (song: SongType) =>
      set((state) => {
        state.currentSong = song;
      }),

    setCurrentIndex: (index: number) =>
      set((state) => {
        state.currentIndex = index;
      }),

    setCurrentTime: (newTime) =>
      set((state) => {
        state.currentTime = newTime;
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

    setSequencePlayList: (list: SongType[]) =>
      set((state) => {
        state.sequencePlayList = list;
      }),

    setPlayList: (list: SongType[]) =>
      set((state) => {
        state.playList = list;
      }),

    setShowPlayList: (show: boolean) =>
      set((state) => {
        state.showPlayList = show;
      }),

    setPercent: (percent) =>
      set((state) => {
        state.percent = percent;
      }),

    deleteSong: (currentIndex) =>
      set((state) => {
        state.currentIndex = currentIndex;
      }),
  }))
);

export default usePlayerStore;
