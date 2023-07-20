import { create } from "zustand";
import { PlayMode } from "./types";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean; // 当前歌曲是否播放
  sequencePlayList: any[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: any[];
  playMode: PlayMode; // 播放模式
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  currentSong: {
    al: { picUrl: string };
    name: string;
    ar: { name: string }[];
  };
  percent: number; // 播放百分比
};

type Actions = {
  setCurrentSong: (song: any) => void;
  setCurrentIndex: (index: number) => void;
  setFullScreen: (open: boolean) => void;
  setPlayMode: (mode: PlayMode) => void;
  setPlaying: (newState: boolean) => void;
  setSequencePlayList: () => void;
  setPlayList: () => void;
  setShowPlayList: () => void;
  setPercent: (percent: number) => void;
};

const initialState: State = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  playMode: "sequence", // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  },
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
    setPlayList: () => set((state) => ({ ...state })),
    setShowPlayList: () => set((state) => ({ ...state })),
    setPercent: (percent) =>
      set((state) => {
        state.percent = percent;
      }),
  }))
);

export default usePlayerStore;
