import { FC, useContext, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { formatPlayTime, getName } from "@/utils/utils";
import { DownOutlined, ShareAltOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { usePlayerStore } from "@/store";
import ProgressBar from "../ProgressBar";
import { CurrentTimeContext } from "..";

interface IProps {
  song: {
    al: { picUrl: string };
    name: string;
    ar: { name: string }[];
  };
  currentTime: number;
  duration: number;
}

const FullScreenPlayer: FC<IProps> = ({ song, currentTime, duration }) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);
  const [percent, setPercent] = usePlayerStore((state) => [state.percent, state.setPercent]);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const [currentSong, setCurrentSong] = usePlayerStore((state) => [state.currentSong, state.setCurrentSong]);
  const { setSongProgress } = useContext(CurrentTimeContext);

  const changePercent = (currentPercent: number) => {
    setPercent(currentPercent);
    setSongProgress(percent);
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
          <div className={styles.cdWrapper}>
            <img
              className={classNames(styles.cdInner, playing ? "" : styles.pause)}
              src={song.al.picUrl + "?param=400x400"}
              alt="cover"
            />
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.progressContainer}>
            <div className={styles.time}>{formatPlayTime(currentTime)}</div>
            <ProgressBar></ProgressBar>
            <div className={styles.time}>{formatPlayTime(duration)}</div>
          </div>

          {/* 播放控件 */}
          <div className={styles.iconList}>
            <div className={styles.iconBox}>
              <i className={classNames("iconfont", styles.icon)}>&#xe625;</i>
            </div>
            <div className={styles.iconBox}>
              <i className={classNames("iconfont", styles.icon)}>&#xe6e1;</i>
            </div>
            <div className={styles.iconBox}>
              <i
                className={classNames("iconfont", styles.icon, styles.center)}
                onClick={() => setPlaying(!playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;",
                }}
              ></i>
            </div>
            <div className={styles.iconBox}>
              <i className={classNames("iconfont", styles.icon)}>&#xe718;</i>
            </div>
            <div className={styles.iconBox}>
              <i className={classNames("iconfont", styles.icon)}>&#xe640;</i>
            </div>
          </div>
        </footer>
      </div>
    </CSSTransition>
  );
};

export default FullScreenPlayer;
