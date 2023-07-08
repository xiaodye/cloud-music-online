import React from "react";
import styles from "./styles.module.scss";
import { getName } from "@/utils/utils";
import classNames from "classnames";

type List = {
  name: string;
  ar: { name: string }[];
  al: { name: string };
};

export interface IProps {
  list: List[];
}

const SongList: React.FC<IProps> = ({ list }) => {
  return (
    <ul className={styles.songList}>
      {list.map((item, index) => (
        <li key={index} className={styles.songListItem}>
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