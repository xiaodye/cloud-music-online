import React from "react";
import styles from "./styles.module.scss";

const ProgressBar: React.FC = () => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.barInner}>
        <div className={styles.progress}></div>
        <div className={styles.progressBtnWrapper}>
          <div className={styles.progressBtn}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
