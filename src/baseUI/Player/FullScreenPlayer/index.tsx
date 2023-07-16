import { FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { getName } from "@/utils/utils";
import { DownOutlined, ShareAltOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { usePlayerStore } from "@/store";

interface IProps {
  song: {
    al: { picUrl: string };
    name: string;
    ar: { name: string }[];
  };
}

const FullScreenPlayer: FC<IProps> = ({ song }) => {
  const [fullScreen, setFullScreen] = usePlayerStore((state) => [state.fullScreen, state.setFullScreen]);

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

        <main className={styles.middle}>
          <div className={styles.cdWrapper}>
            <img className={styles.cdInner} src={song.al.picUrl + "?param=400x400"} alt="cover" />
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.iconBox}>
            <i className={classNames("iconfont", styles.icon)}>&#xe625;</i>
          </div>
          <div className={styles.iconBox}>
            <i className={classNames("iconfont", styles.icon)}>&#xe6e1;</i>
          </div>
          <div className={styles.iconBox}>
            <i className={classNames("iconfont", styles.icon, styles.center)}>&#xe723;</i>
          </div>
          <div className={styles.iconBox}>
            <i className={classNames("iconfont", styles.icon)}>&#xe718;</i>
          </div>
          <div className={styles.iconBox}>
            <i className={classNames("iconfont", styles.icon)}>&#xe640;</i>
          </div>
        </footer>
      </div>
    </CSSTransition>
  );
};

export default FullScreenPlayer;