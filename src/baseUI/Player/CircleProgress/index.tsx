import classNames from "classnames";
import React, { CSSProperties, ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import useMount from "@/hooks/useMount";

interface IProps {
  rate: number; // 百分比
  size: number; // 圆形大小 px
  layerColor: string; // 轨道颜色
  color: string; // 进度条颜色
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

const CircleProgress: React.FC<IProps> = ({ rate, size, color, layerColor, style, className, children }) => {
  const circleRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    circleRef.current?.style.setProperty("--color", color);
    circleRef.current?.style.setProperty("--layerColor", layerColor);
  });

  useEffect(() => {
    circleRef.current?.style.setProperty("--rate", String(rate));
  }, [rate]);

  return (
    <div
      ref={circleRef}
      style={{ width: size, height: size, ...style }}
      className={classNames(styles.circleProgress, rate < 50 ? styles.less : "", className)}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CircleProgress;
