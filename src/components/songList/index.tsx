import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
import { getName } from "@/utils/utils";
import classNames from "classnames";
import { usePlayerStore } from "@/store";
import { SongType } from "@/api/types";

export interface IProps {
  list: SongType[];
  style?: CSSProperties;
}

const SongList: React.FC<IProps> = ({ list, style }) => {
  const { setPlayList, setSequencePlayList, setCurrentIndex } = usePlayerStore((state) => ({
    setPlayList: state.setPlayList,
    setSequencePlayList: state.setSequencePlayList,
    setCurrentIndex: state.setCurrentIndex,
  }));

  /**
   * 选择一首歌曲进行播放
   * @param index
   */
  const chooseSong = (index: number) => {
    // 1. 添加歌单到播放列表
    // 2. 根据歌曲的索引设置 currentIndex, 并以此触发播放
    setSequencePlayList(list);
    setPlayList(list);
    setCurrentIndex(index);

    // 至于为什么没有设置 currentSong 和 playing, 因为在 Player 组件 监听了 currentIndex, 会进行播放
    // 可以再做一个正在播放的歌曲高亮效果
  };

  return (
    <ul className={styles.songList} style={style}>
      {list.map((item, index) => (
        <li key={index} className={styles.songListItem} onClick={() => chooseSong(index)}>
          <div className={styles.songListItemIndex}>{index + 1}</div>
          <div className={styles.songListItemInfo}>
            <span className={classNames("text-noWrap", styles.songListItemInfoName)}>{item.name}</span>
            <span className={classNames("text-noWrap", styles.songListItemInfoMsg)}>
              {getName(item.ar)} - {item.al.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SongList;
