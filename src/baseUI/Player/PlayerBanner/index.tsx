import { FC } from "react";
import { getName } from "@/utils/utils";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { usePlayerStore } from "@/store";
import { SongType } from "@/api/types";
import useTogglePlayState from "@/hooks/useTogglePlayState";
import CircleProgress from "../CircleProgress";

interface IProps {
  song: SongType;
}

const PlayerBanner: FC<IProps> = ({ song }) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);
  const { playing, percent, setShowPlayList } = usePlayerStore((state) => ({
    playing: state.playing,
    percent: state.percent,
    setShowPlayList: state.setShowPlayList,
  }));

  const { togglePlayState } = useTogglePlayState();

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
        <CircleProgress rate={percent * 100} size={30} layerColor="#e9a19c" color="#d44439">
          <div className={styles.iconBox} onClick={() => togglePlayState()}>
            <i
              className={classNames("iconfont", styles.iconPlay)}
              dangerouslySetInnerHTML={{ __html: playing ? "&#xe650;" : "&#xe61e;" }}
            ></i>
          </div>
        </CircleProgress>

        <i className={classNames("iconfont", styles.iconSong)} onClick={() => setShowPlayList(true)}>
          &#xe640;
        </i>
      </div>
    </div>
  );
};

export default PlayerBanner;
