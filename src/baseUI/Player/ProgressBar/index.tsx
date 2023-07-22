import React, { useEffect, useRef, TouchEvent, MouseEvent, useContext } from "react";
import styles from "./styles.module.scss";
import { useImmer } from "use-immer";
import useMount from "@/hooks/useMount";
import { usePlayerStore } from "@/store";
import { CurrentTimeContext } from "..";

type TouchType = {
  initiated: boolean;
  startX: number;
  progressWidth: number;
  progressBtnWidth: number;
};

interface IProps {
  percent: number;
  onPercentChange?: (percent: number) => void;
}

const ProgressBar: React.FC = () => {
  const progressBar = useRef<HTMLDivElement>({} as HTMLDivElement);
  const progress = useRef<HTMLDivElement>({} as HTMLDivElement);
  const progressBtn = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [percent, setPercent] = usePlayerStore((state) => [state.percent, state.setPercent]);
  const { setSongProgress } = useContext(CurrentTimeContext);

  const [touch, setTouch] = useImmer<TouchType>({
    initiated: false,
    startX: 0,
    progressWidth: 0,
    progressBtnWidth: 16,
  });

  // 当播放进度百分比 percent 发生改变时，滑块的偏移也要变
  useEffect(() => {
    const progressBarWidth = progressBar.current.clientWidth - touch.progressBtnWidth;
    const offsetWidth = percent * progressBarWidth;
    moveTo(offsetWidth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, touch.progressBtnWidth]);

  // 处理进度条的偏移
  const moveTo = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate(${offsetWidth}px, -50%)`;

    // 更改进度条百分比
    changePercent();
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
    const progressBarWidth = progressBar.current.clientWidth - touch.progressBtnWidth;

    // progress 的长度不能超过 progressBar 的长度
    const offsetWidth = Math.min(Math.max(0, touch.progressWidth + slideX), progressBarWidth);

    moveTo(offsetWidth);
  };

  const progressTouchEnd = () => {
    setTouch((touch) => {
      touch.initiated = false;
    });
  };

  /**
   * 点击移动到指定位置
   * @param e
   */
  const progressClick = (e: MouseEvent) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;

    moveTo(offsetWidth);
  };

  /**
   * 进度条改变
   * @param percent 百分比
   */
  const changePercent = () => {
    // 根据进度条总长度和滑块长度计算百分比，然后更新百分比
    const progressBarWidth = progressBar.current.clientWidth - touch.progressBtnWidth;
    const currentPercent = progress.current.clientWidth / progressBarWidth; // 新的百分比计算

    // 更改歌曲进度百分比
    setPercent(currentPercent);

    // 设置歌曲的currentTime
    setSongProgress(percent);
  };

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} ref={progressBar} onClick={progressClick}>
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
