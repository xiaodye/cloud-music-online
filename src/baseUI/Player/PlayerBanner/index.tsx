import { FC } from "react";
import { getName } from "@/utils/utils";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { usePlayerStore } from "@/store";
// import ProgressCircle from "../ProgressCircle";
import { Circle } from "react-vant";
import { SongType } from "@/api/types";

interface IProps {
  song: SongType;
}

const PlayerBanner: FC<IProps> = ({ song }) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const { percent, showPlayList, setShowPlayList } = usePlayerStore((state) => ({
    percent: state.percent,
    showPlayList: state.showPlayList,
    setShowPlayList: state.setShowPlayList,
  }));

  return (
    <div className={styles.miniPlayerContainer}>
      <div className={styles.songInfo} onClick={() => setFullScreen(!fullScreen)}>
        {/* 暂停的时候停止旋转 */}
        <img
          src={song.al.picUrl}
          className={classNames(styles.avatar, styles.play, playing ? "" : styles.pause)}
          alt="avatar"
        />
        <div className={styles.info}>
          <span className={classNames(styles.infoName, "text-noWrap")}>{song.name}</span>
          <span className={classNames(styles.infoSinger, "text-noWrap")}>{getName(song.ar)}</span>
        </div>
      </div>

      <div className={styles.songControl}>
        {/* <ProgressCircle radius={25} percent={0.2}>
          <i className={classNames("iconfont", styles.icon, styles.play)}>&#xe650;</i>
        </ProgressCircle> */}
        <Circle
          rate={percent * 100}
          size={30}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          strokeWidth={80}
          layerColor="#e9a19c"
          color="#d44439"
          className={styles.progressCircle}
        >
          <div className={styles.iconBox} onClick={() => setPlaying(!playing)}>
            <i
              className={classNames("iconfont", styles.iconPlay)}
              dangerouslySetInnerHTML={{ __html: playing ? "&#xe650;" : "&#xe61e;" }}
            ></i>
          </div>
        </Circle>

        <i className={classNames("iconfont", styles.iconSong)} onClick={() => setShowPlayList(!showPlayList)}>
          &#xe640;
        </i>
      </div>
    </div>
  );
};

export default PlayerBanner;
