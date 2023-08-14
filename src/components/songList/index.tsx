import React, { CSSProperties, useMemo } from "react";
import styles from "./styles.module.scss";
import { getName } from "@/utils/utils";
import classNames from "classnames";
import { usePlayerStore } from "@/store";
import { SongType } from "@/api/types";
import { FixedSizeList as List } from "react-window";

export interface IProps {
  list: SongType[];
  style?: CSSProperties;
  height: number;
}

const SongList: React.FC<IProps> = ({ list, style, height }) => {
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
    <List
      style={style}
      itemData={list}
      width="100vw"
      height={height}
      itemCount={list.length}
      itemSize={60}
      innerElementType="ul"
    >
      {({ data, index, style }) => (
        <li key={index} style={style} className={styles.songListItem} onClick={() => chooseSong(index)}>
          <div className={styles.songListItemIndex}>{index + 1}</div>
          <div className={styles.songListItemInfo}>
            <span className={classNames("text-noWrap", styles.songListItemInfoName)}>{data[index].name}</span>
            <span className={classNames("text-noWrap", styles.songListItemInfoMsg)}>
              {getName(data[index].ar)} - {data[index].al.name}
            </span>
          </div>
        </li>
      )}
    </List>
  );
};

export default SongList;
