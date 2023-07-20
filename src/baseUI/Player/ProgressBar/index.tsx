import React, { useEffect, useRef, TouchEvent, MouseEvent } from "react";
import styles from "./styles.module.scss";
import { useImmer } from "use-immer";

type TouchType = {
  initiated: boolean;
  startX: number;
  progressWidth: number;
  progressBtnWidth: number;
};

interface IProps {
  percentChangeHandler?: (percent: number) => void;
}

const ProgressBar: React.FC<IProps> = ({ percentChangeHandler }) => {
  const progressContainer = useRef<HTMLDivElement>({} as HTMLDivElement);
  const progress = useRef<HTMLDivElement>({} as HTMLDivElement);
  const progressBtn = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [touch, setTouch] = useImmer<TouchType>({
    initiated: false,
    startX: 0,
    progressWidth: 0,
    progressBtnWidth: 16,
  });

  // 处理进度条的偏移
  const moveTo = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate(${offsetWidth}px, -50%)`;
  };

  const progressTouchStart = (e: TouchEvent) => {
    setTouch((touch) => {
      touch.initiated = true; // true 表示滑动动作开始了
      touch.startX = e.touches[0].pageX; // 滑动开始时横向坐标
      touch.progressWidth = progress.current.clientWidth; // 当前 progress 长度
    });
  };

  const progressTouchMove = (e: TouchEvent) => {
    if (!touch.initiated) return;
    // 计算滑动距离
    const slideX = e.touches[0].pageX - touch.startX;

    // 计算滚动条长度
    const progressBarWidth = progressContainer.current.clientWidth - touch.progressBtnWidth;

    // progress 的长度不能超过 progressBar 的长度
    const offsetWidth = Math.min(Math.max(0, touch.progressWidth + slideX), progressBarWidth);

    moveTo(offsetWidth);
  };

  const progressTouchEnd = () => {
    setTouch((touch) => {
      touch.initiated = false;
    });
  };

  const progressClick = (e: MouseEvent) => {
    const rect = progressContainer.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;

    moveTo(offsetWidth);
  };

  /**
   * 进度条改变
   * @param percent 百分比
   */
  const changePercent = (percent: number) => {
    const progressBarWidth = progressContainer.current.clientWidth - touch.progressBtnWidth;
    const currentPercent = progress.current.clientWidth / progressBarWidth; // 新的进度计算

    percentChangeHandler && percentChangeHandler(currentPercent); // 把新的进度传给回调函数并执行
  };

  return (
    <div className={styles.progressBar}>
      <div className={styles.barInner} ref={progressContainer} onClick={progressClick}>
        <div className={styles.progress} ref={progress}></div>
        <div
          className={styles.progressBtnWrapper}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className={styles.progressBtn} ref={progressBtn}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
