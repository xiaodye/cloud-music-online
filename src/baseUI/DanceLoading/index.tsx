import React, { memo } from "react";
import styles from "./styles.module.scss";

type IProps = {
  loadText?: string;
  style?: React.CSSProperties;
};

const DanceLoading: React.FC<IProps> = memo(({ loadText, style }) => {
  return (
    <div className={styles.container} style={style}>
      <ul className={styles.danceList}>
        {[1, 2, 3, 4, 5].map((item) => (
          <li className={styles.danceListItem} key={item}></li>
        ))}
      </ul>
      <p>{loadText ?? "拼命加载中..."}</p>
    </div>
  );
});
export default DanceLoading;
