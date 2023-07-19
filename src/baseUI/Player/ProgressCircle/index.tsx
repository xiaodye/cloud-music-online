import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type IProps = {
  radius: number;
  percent: number;
  children: React.ReactNode;
};

const ProgressCircle: React.FC<IProps> = ({ radius, percent, children }) => {
  // 整个背景的周长
  const dashArray = Math.PI * 100;

  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;

  return (
    <div className={styles.circleWrapper}>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={classNames(styles.circle, styles.progressBackground)}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className={classNames(styles.circle, styles.progressBackground)}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className={styles.circleContent}>{children}</div>
    </div>
  );
};

export default ProgressCircle;
