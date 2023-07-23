import { FC, useRef } from "react";
import styles from "./styles.module.scss";
import { usePlayerStore } from "@/store";
import { CSSTransition } from "react-transition-group";
import { PlayMode } from "@/store/player/types";
import Scroll from "../Scroll";
import { getName } from "@/utils/utils";
import classNames from "classnames";
import useTogglePlayMode from "@/hooks/useTogglePlayMode";

const PlayList: FC = () => {
  const playListContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const listContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [showPlayList, setShowPlayList] = usePlayerStore((state) => [state.showPlayList, state.setShowPlayList]);
  const [currentIndex, setCurrentIndex] = usePlayerStore((state) => [state.currentIndex, state.setCurrentIndex]);
  const { playList, playMode } = usePlayerStore((state) => ({
    playMode: state.playMode,
    playList: state.playList,
    sequencePlayList: state.sequencePlayList,
    currentIndex: state.currentIndex,
    currentSong: state.currentSong,
  }));

  const { togglePlayMode } = useTogglePlayMode();

  const getPlayModeIcon = () => {
    if (playMode === PlayMode.SEQUENCE) {
      return "&#xe625;";
    } else if (playMode === PlayMode.LOOP) {
      return "&#xe653;";
    } else {
      return "&#xe61b;";
    }
  };

  const getPlayModeText = () => {
    if (playMode === PlayMode.SEQUENCE) {
      return "顺序播放";
    } else if (playMode === PlayMode.LOOP) {
      return "循环播放";
    } else {
      return "随机播放";
    }
  };

  const toggleSong = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames={{
        enter: styles.listFadeEnter,
        enterActive: styles.listFadeEnterActive,
        enterDone: styles.listFadeEnterDone,
        exit: styles.listFadeExit,
        exitActive: styles.listFadeExitActive,
        exitDone: styles.listFadeExitDone,
      }}
    >
      <div className={styles.playlistContainer} ref={playListContainerRef} onClick={() => setShowPlayList(false)}>
        <div className={styles.listContainer} ref={listContainerRef} onClick={(e) => e.stopPropagation()}>
          <div className={styles.listHeader}>
            <div className={styles.listHeaderLf} onClick={togglePlayMode}>
              <i className="iconfont" dangerouslySetInnerHTML={{ __html: getPlayModeIcon() }}></i>
              <span className={styles.text}>{getPlayModeText()}</span>
            </div>
            <div className={styles.listHeaderRg}>
              <i className="iconfont">&#xe63d;</i>
            </div>
          </div>

          <div className={styles.scrollWrapper}>
            <Scroll>
              <ul className={styles.list}>
                {playList.map((song, index) => (
                  <li key={song.id} className={styles.listItem} onClick={() => toggleSong(index)}>
                    <span className={styles.icon} style={{ opacity: currentIndex === index ? 1 : 0 }}>
                      <i className="iconfont">&#xe6e3;</i>
                    </span>
                    <span
                      className={classNames(
                        styles.songText,
                        "text-noWrap",
                        currentIndex === index ? styles.active : ""
                      )}
                    >
                      {song.name} - {getName(song.ar)}
                    </span>
                    <span className={classNames(styles.iconLike, styles.icon)}>
                      <i className="iconfont">&#xe601;</i>
                    </span>
                    <span className={styles.icon}>
                      <i className="iconfont">&#xe63d;</i>
                    </span>
                  </li>
                ))}
              </ul>
            </Scroll>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PlayList;
