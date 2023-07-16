import { create } from "zustand";
import { PlayMode } from "./types";
import { immer } from "zustand/middleware/immer";

type State = {
  fullScreen: boolean; // 播放器是否为全屏模式
  playing: boolean; // 当前歌曲是否播放
  sequencePlayList: any[]; // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: any[];
  mode: PlayMode; // 播放模式
  currentIndex: number; // 当前歌曲在播放列表的索引位置
  showPlayList: boolean; // 是否展示播放列表
  currentSong: object;
};

type Actions = {
  setCurrentSong: () => void;
  setCurrentIndex: () => void;
  setFullScreen: () => void;
  setPlayMode: () => void;
  setPlayingState: () => void;
  setSequencePlayList: () => void;
  setPlayList: () => void;
  setShowPlayList: () => void;
};

const initialState: State = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: "sequence", // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
};

const usePlayerStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,

    setCurrentSong: () => set((state) => ({ ...state })),
    setCurrentIndex: () => set((state) => ({ ...state })),
    setFullScreen: () => set((state) => ({ ...state })),
    setPlayMode: () => set((state) => ({ ...state })),
    setPlayingState: () => set((state) => ({ ...state })),
    setSequencePlayList: () => set((state) => ({ ...state })),
    setPlayList: () => set((state) => ({ ...state })),
    setShowPlayList: () => set((state) => ({ ...state })),
  }))
);

export default usePlayerStore;
