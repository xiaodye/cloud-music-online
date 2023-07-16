import { FC } from "react";
import { getName } from "@/utils/utils";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface IProps {
  song: {
    al: { picUrl: string };
    name: string;
    ar: { name: string }[];
  };
}

const PlayerBanner: FC<IProps> = ({ song }) => {
  return (
    <div className={styles.miniPlayerContainer}>
      <div className={styles.songInfo}>
        <img src={song.al.picUrl} className={classNames(styles.avatar, styles.play)} alt="avatar" />
        <div className={styles.info}>
          <span className={classNames(styles.infoName, "text-noWrap")}>{song.name}</span>
          <span className={classNames(styles.infoSinger, "text-noWrap")}>{getName(song.ar)}</span>
        </div>
      </div>

      <div className={styles.songControl}>
        <i className={classNames("iconfont", styles.icon)}>&#xe650;</i>
        <i className={classNames("iconfont", styles.icon)}>&#xe640;</i>
      </div>
    </div>
  );
};

export default PlayerBanner;
