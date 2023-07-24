import { FC, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { formatPlayTime, getName } from "@/utils/utils";
import { DownOutlined, ShareAltOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { usePlayerStore } from "@/store";
import ProgressBar from "../ProgressBar";
import { SongType } from "@/api/types";
import { PlayMode } from "@/store/player/types";
import Scroll from "@/components/Scroll";
import { LyricLineType } from "..";
import useTogglePlayState from "@/hooks/useTogglePlayState";

interface IProps {
  song: SongType;
  currentTime: number;
  duration: number;

  prevHandler: () => void;
  nextHandler: () => void;
  togglePlayMode: () => void;
  lyricLines: LyricLineType[];
}

const FullScreenPlayer: FC<IProps> = ({
  song,
  currentTime,
  duration,
  prevHandler,
  nextHandler,
  togglePlayMode,
  lyricLines,
}) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const { playMode, setShowPlayList } = usePlayerStore((state) => ({
    playMode: state.playMode,
    setShowPlayList: state.setShowPlayList,
  }));

  const [showLyric, setShowLyric] = useState(false);

  const { togglePlayState } = useTogglePlayState();

  const getPlayModeIcon = () => {
    if (playMode === PlayMode.SEQUENCE) {
      return "&#xe625;";
    } else if (playMode === PlayMode.LOOP) {
      return "&#xe653;";
    } else {
      return "&#xe61b;";
    }
  };

  return (
    <CSSTransition
      in={fullScreen}
      timeout={400}
      classNames={{
        enter: styles.flyEnter,
        enterActive: styles.flyEnterActive,
        enterDone: styles.flyEnterDone,
        exit: styles.flyExit,
        exitActive: styles.flyExitActive,
        exitDone: styles.flyExitDone,
      }}
    >
      <div className={styles.playerContainer}>
        <div className={styles.mask}>
          <img src={song.al.picUrl + "?param=300x300"} alt="song-img" />
        </div>

        <header className={styles.header}>
          <div onClick={() => setFullScreen(false)}>
            <DownOutlined className={styles.icon} />
          </div>
          <div className={styles.info}>
            <span className={styles.infoName}>{song.name}</span>
            <span className={styles.infoSinger}>{getName(song.ar)} </span>
          </div>
          <ShareAltOutlined className={styles.icon} />
        </header>

        {/* 转盘 */}
        <main className={styles.middle}>
          <div
            className={styles.cdWrapper}
            style={{ opacity: showLyric ? 0 : 1, zIndex: showLyric ? 0 : 5 }}
            onClick={() => setShowLyric(!showLyric)}
          >
            <img
              className={classNames(styles.cdInner, playing ? "" : styles.pause)}
              src={song.al.picUrl + "?param=400x400"}
              alt="cover"
            />
          </div>

          <div
            className={styles.lyricContainer}
            style={{ opacity: showLyric ? 1 : 0, zIndex: showLyric ? 5 : 0 }}
            onClick={() => setShowLyric(!showLyric)}
          >
            <Scroll>
              <div className={styles.lyricList}>
                {lyricLines ? (
                  lyricLines.map((item) => (
                    <p key={item.time} className={styles.lyricListItem}>
                      {item.txt}
                    </p>
                  ))
                ) : (
                  <p>歌词解析中...</p>
                )}
              </div>
            </Scroll>
          </div>

          <div
            className={classNames(styles.needle, playing ? "" : styles.needlePause)}
            style={{ opacity: showLyric ? 0 : 1, zIndex: showLyric ? 0 : 5 }}
          ></div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.progressContainer}>
            <div className={styles.time}>{formatPlayTime(currentTime)}</div>
            <ProgressBar></ProgressBar>
            <div className={styles.time}>{formatPlayTime(duration)}</div>
          </div>

          {/* 播放控件 */}
          <div className={styles.iconList}>
            <div className={styles.iconBox} onClick={togglePlayMode}>
              <i
                className={classNames("iconfont", styles.icon)}
                dangerouslySetInnerHTML={{ __html: getPlayModeIcon() }}
              ></i>
            </div>
            <div className={styles.iconBox} onClick={prevHandler}>
              <i className={classNames("iconfont", styles.icon)}>&#xe6e1;</i>
            </div>
            <div className={styles.iconBox}>
              <i
                className={classNames("iconfont", styles.icon, styles.center)}
                onClick={() => togglePlayState()}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;",
                }}
              ></i>
            </div>
            <div className={styles.iconBox} onClick={nextHandler}>
              <i className={classNames("iconfont", styles.icon)}>&#xe718;</i>
            </div>
            <div className={styles.iconBox} onClick={() => setShowPlayList(true)}>
              <i className={classNames("iconfont", styles.icon)}>&#xe640;</i>
            </div>
          </div>
        </footer>
      </div>
    </CSSTransition>
  );
};

export default FullScreenPlayer;
