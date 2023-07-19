import { FC } from "react";
import { getName } from "@/utils/utils";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { usePlayerStore } from "@/store";
import ProgressCircle from "../ProgressCircle";
import { Circle } from "react-vant";

interface IProps {
  song: {
    al: { picUrl: string };
    name: string;
    ar: { name: string }[];
  };
}

const PlayerBanner: FC<IProps> = ({ song }) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);

  return (
    <div className={styles.miniPlayerContainer}>
      <div className={styles.songInfo} onClick={() => setFullScreen(!fullScreen)}>
        <img src={song.al.picUrl} className={classNames(styles.avatar, styles.play)} alt="avatar" />
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
          rate={70}
          size={30}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          strokeWidth={80}
          layerColor="#e9a19c"
          color="#d44439"
        >
          <i className={classNames("iconfont", styles.icon, styles.play)}>&#xe650;</i>
        </Circle>

        <div className={styles.iconBox}>
          <i className={classNames("iconfont", styles.icon)}>&#xe640;</i>
        </div>
      </div>
    </div>
  );
};

export default PlayerBanner;
