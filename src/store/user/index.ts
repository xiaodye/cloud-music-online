import { create } from "zustand";

type State = {
  userInfo: {
    nickname: string;
    avatarUrl: string;
  };
  hasLogin: boolean;
};

type Actions = {
  setHasLogin: (status: boolean) => void;
  setUserInfo: (userInfo: { nickname?: string; avatarUrl?: string }) => void;
  deleteUserInfo: () => void;
};

const initialState: State = {
  userInfo: {
    nickname: "",
    avatarUrl: "",
  },
  hasLogin: false,
};

const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  setHasLogin: (status) => set((state) => ({ ...state, hasLogin: status })),
  setUserInfo: (userInfo) => set((state) => ({ ...state, userInfo: { ...state.userInfo, ...userInfo } })),
  deleteUserInfo: () => set(() => initialState),
}));

export default useUserStore;
