import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Loading: React.FC = React.memo(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}></div>
      <div className={classNames(styles.wrapperItem, styles.second)}></div>
    </div>
  );
});

export default Loading;
