import { FC, useCallback, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { usePlayerStore } from "@/store";
import { CSSTransition } from "react-transition-group";

const PlayList: FC = () => {
  const [showPlayList, setShowPlayList] = usePlayerStore((state) => [state.showPlayList, state.setShowPlayList]);
  const [isShow, setIsShow] = useState(false);
  const playListContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const playListRef = useRef<HTMLDivElement>({} as HTMLDivElement);

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
        <div className={styles.list} ref={playListRef} onClick={(e) => e.stopPropagation()}>
          <div className={styles.scrollWrapper}></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PlayList;
