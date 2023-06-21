import { createStore, applyMiddleware } from "redux";
import { create } from "zustand";
import { produce } from "immer";

type State = {
  count: number;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

const useStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty) => set((state) => ({ count: state.count + qty })),
  decrement: (qty) => set((state) => ({ count: state.count - qty })),
}));

export default useStore;
