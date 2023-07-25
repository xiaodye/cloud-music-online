import { forwardRef, useRef, useImperativeHandle, useEffect } from "react";
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
import { SyncOutlined } from "@ant-design/icons";

// 使用插件
BScroll.use(PullUp);
BScroll.use(PullDown);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

export type PullUpStateType = "more" | "loading" | "noMore";

interface IProps {
  direction?: "vertical" | "horizontal"; // 垂直 | 水平
  bounceTop?: boolean; // 下拉是否有回弹效果
  click?: boolean; // 是否可点击
  isPullUpLoad?: boolean; // 是否开启上拉刷新事件
  isPullDownRefresh?: boolean; // 是否开启下拉加载更多
  style?: React.CSSProperties; // 样式透传
  pullDownLoading?: boolean; // 正在下拉
  pullUpState?: PullUpStateType;
  // pullUpLoadText?: string; // 上拉加载文字
  // pullDownLoadText?: string; // 下拉刷新文字
  children: React.ReactNode; // 容器元素
  onScroll?: () => void; // 滚动触发函数
  pullUp?: () => void; // 上拉触发函数
  pullDown?: () => void; // 下拉触发函数
}

// 子组件
export interface ScrollRef {
  refresh: () => void;
  finishPullDown: () => void;
  finishPullUp: () => void;
}

const Scroll = forwardRef<ScrollRef, IProps>((props, ref) => {
  const {
    children,
    direction = "vertical",
    click = true,
    isPullUpLoad = false,
    isPullDownRefresh = false,
    bounceTop = true,
    pullUpState = "more",
    pullDownLoading = false,

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
      refresh: () => {
        bs.current.refresh();
      },
      finishPullDown: () => {
        bs.current.finishPullDown();
      },
      finishPullUp: () => {
        bs.current.finishPullUp();
      },
    }),
    []
  );

  // 组件挂载
  useMount(() => {
    bs.current = new BScroll(bsContainer.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      click: click,
      bounce: {
        top: bounceTop,
      },
      observeDOM: true, // 开启 observe-dom 插件
      observeImage: true, // 开启 observe-image 插件
      probeType: 3,

      pullUpLoad: isPullUpLoad ? true : undefined, // 配置上拉加载
      pullDownRefresh: isPullDownRefresh ? true : undefined, // 配置下拉刷新
    });

    // 绑定滚动事件
    bs.current.on("scroll", () => {
      onScroll && onScroll();
    });

    // 绑定下拉事件
    isPullDownRefresh &&
      bs.current.on("pullingDown", () => {
        pullDown && pullDown();
      });

    // 绑定上拉事件
    isPullUpLoad &&
      bs.current.on("pullingUp", () => {
        pullUp && pullUp();
      });
  });

  // 组件卸载
  useUnMount(() => {
    // 销毁 bs ，并且解绑事件
    bs.current.destroy();
    bs.current.off("scroll");
    isPullDownRefresh && bs.current.off("pullingDown");
    isPullUpLoad && bs.current.off("pullingUp");
  });

  const getPullUpStateText = (state: PullUpStateType) => {
    if (state === "more") {
      return "加载更多";
    } else if (state === "loading") {
      return "正在加载更多...";
    } else {
      return "没有更多了";
    }
  };

  // useEffect(() => {
  //   console.log(bs.current);
  // }, [pullUpState]);

  return (
    <div className={styles.container} style={style} ref={bsContainer}>
      <div className={styles.content}>
        {isPullDownRefresh && (
          <div className={styles.pullDownContainer} style={{ visibility: isPullDownRefresh ? "visible" : "hidden" }}>
            <DanceLoading />
          </div>
        )}

        {children}

        {isPullUpLoad && (
          <div className={styles.pullUpContainer}>
            <SyncOutlined spin={pullUpState === "loading"} className={styles.icon} />
            <span>{getPullUpStateText(pullUpState)}</span>
          </div>
        )}
      </div>
    </div>
  );
});

export default Scroll;
