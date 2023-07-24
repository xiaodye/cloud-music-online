import { usePlayerStore } from "@/store";

function useTogglePlayState() {
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const [currentIndex, setCurrentIndex] = usePlayerStore((state) => [state.currentIndex, state.setCurrentIndex]);

  /**
   * 切换播放状态
   * @returns
   */
  const togglePlayState = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
      return;
    }

    setPlaying(!playing);
  };

  return { togglePlayState };
}

export default useTogglePlayState;
