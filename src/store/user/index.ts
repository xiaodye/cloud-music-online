import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  username: string;
  password: string;
};

type Actions = {
  setUserInfo: (userInfo: State) => void;
  deleteUserInfo: () => void;
};

const initialState: State = {
  username: "",
  password: "",
};

const useUserStore = create(
  immer<State & Actions>((set) => ({
    ...initialState,
    setUserInfo: (userInfo) => set(() => ({ ...userInfo })),
    deleteUserInfo: () => set(() => initialState),
  }))
);

export default useUserStore;
