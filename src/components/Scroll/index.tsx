import { forwardRef, useRef, useImperativeHandle } from "react";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
import styles from "./styles.module.scss";
import useMount from "@/hooks/useMount";
import useUnMount from "@/hooks/useUnmount";
import DanceLoading from "@/baseUI/DanceLoading";
import React from "react";

// 使用插件
BScroll.use(PullUp);
BScroll.use(PullDown);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

interface IProps {
  direction?: "vertical" | "horizental";
  click?: boolean;
  style?: React.CSSProperties;
  pullUpLoading?: boolean;
  pullUpLoadText?: string;
  pullDownLoading?: boolean;
  pullDownLoadText?: string;
  children: React.ReactNode;
  onScroll?: () => void;
  pullUp?: () => void;
  pullDown?: () => void;
}

// 子组件
export interface ScrollRef {
  refresh(): void;
}

const Scroll = forwardRef<ScrollRef, IProps>((props, ref) => {
  const {
    children,
    direction = "vertical",
    click = true,
    pullUpLoading = false,
    pullUpLoadText,
    pullDownLoading = false,
    pullDownLoadText,
    style,
    onScroll,
    pullUp,
    pullDown,
  } = props;
  // current 指向初始化 bs 实例需要的 DOM 元素
  const bsContainer = useRef<HTMLDivElement>({} as HTMLDivElement);
  // 用于存储一个 BScroll 实例
  const bs = useRef<BScroll>({} as BScroll);

  // 暴露给外部组件使用;
  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        bs.current.refresh();
      },
    }),
    []
  );

  useMount(() => {
    bs.current = new BScroll(bsContainer.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      click: click,
      pullUpLoad: true,
      pullDownRefresh: {
        threshold: 60,
      },
      observeDOM: true, // 开启 observe-dom 插件
      observeImage: true, // 开启 observe-image 插件
      probeType: 3,
    });

    // 绑定事件
    bs.current.on("scroll", () => {
      onScroll && onScroll();
    });
    bs.current.on("pullingDown", () => {
      pullDown && pullDown();
      bs.current.finishPullDown();
    });
    bs.current.on("pullingUp", () => {
      pullUp && pullUp();
      bs.current.finishPullUp();
    });
  });

  useUnMount(() => {
    // 销毁 bs ，并且解绑事件
    bs.current.destroy();
    bs.current.off("scroll");
    bs.current.off("pullingDown");
    bs.current.off("pullingUp");
  });

  return (
    <div className={styles.container} style={style} ref={bsContainer}>
      <div className={styles.content}>
        <DanceLoading style={{ display: pullDownLoading ? "flex" : "none" }} loadText={pullDownLoadText} />
        {/* {React.Children.map(children, (child, index) => child)} */}
        {children}
        <DanceLoading style={{ display: pullUpLoading ? "flex" : "none" }} loadText={pullUpLoadText} />
      </div>
    </div>
  );
});

export default Scroll;
