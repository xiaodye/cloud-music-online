import { create } from "zustand";

type State = {
  showDrawer: boolean;
};

type Actions = {
  setShowDrawer: (status: boolean) => void;
};

const useDrawerStore = create<State & Actions>((set) => ({
  showDrawer: false,
  setShowDrawer: (status: boolean) => set((state) => ({ ...state, showDrawer: status })),
}));

export default useDrawerStore;
