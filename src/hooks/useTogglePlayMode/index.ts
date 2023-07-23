import { usePlayerStore } from "@/store";
import { PlayMode } from "@/store/player/types";
import { findIndex, shuffle } from "@/utils/utils";

function useTogglePlayMode() {
  const [playMode, setPlayMode] = usePlayerStore((state) => [state.playMode, state.setPlayMode]);
  const [playList, setPlayList] = usePlayerStore((state) => [state.playList, state.setPlayList]);
  const { currentSong, sequencePlayList, setCurrentIndex } = usePlayerStore((state) => ({
    currentSong: state.currentSong,
    sequencePlayList: state.sequencePlayList,
    setCurrentIndex: state.setCurrentIndex,
  }));

  /**
   * 切换歌曲播放模式
   */
  const togglePlayMode = () => {
    const newMode = (playMode + 1) % 3;

    if (newMode === PlayMode.SEQUENCE) {
      setPlayList(sequencePlayList);
      const newIndex = findIndex(currentSong, sequencePlayList);
      setCurrentIndex(newIndex);
    } else if (newMode === PlayMode.LOOP) {
      setPlayList(playList);
    } else if (newMode === PlayMode.RANDOM) {
      const newList = shuffle(sequencePlayList);
      const newIndex = findIndex(currentSong, newList);
      setPlayList(newList);
      setCurrentIndex(newIndex);
    }

    setPlayMode(newMode);
  };

  return { togglePlayMode };
}

export default useTogglePlayMode;
