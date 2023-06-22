import { forwardRef, useRef, useImperativeHandle } from "react";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
import styles from "./styles.module.scss";
import useMount from "@/hooks/useMount";
import useUnMount from "@/hooks/useUnmount";

// 使用上拉和下拉
BScroll.use(PullUp);
BScroll.use(PullDown);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

type ScrollProps = {
  direction: "vertical" | "horizental";
  click: boolean;
  refresh: boolean;
  onScroll: () => void;
  pullUp: () => void;
  pullDown: () => void;
};

type IProps = {
  options?: ScrollProps;
  children?: React.ReactNode;
};

const defaulOptions = {
  direction: "vertical",
  click: true,
  refresh: true,
  pullDownLoading: false,
  pullUpLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onScroll: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pullUp: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pullDown: () => {},
};

const Scroll = forwardRef<HTMLDivElement, IProps>(({ children, options = defaulOptions }, ref) => {
  const { direction, click, refresh } = options;

  // const { pullUp, pullDown, onScroll } = options;

  // current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaniner = useRef<HTMLDivElement>({} as HTMLDivElement);
  // 用于存储一个 BScroll 实例
  const bs = useRef<BScroll>({} as BScroll);
  // 暴露给外部组件使用;
  useImperativeHandle(ref, () => scrollContaniner.current, []);

  useUnMount(() => {
    bs.current.destroy();
    bs.current.off("scroll");
    bs.current.off("pullingDown");
    bs.current.off("pullingUp");
  });

  useMount(() => {
    bs.current = new BScroll(scrollContaniner.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      pullUpLoad: true,
      pullDownRefresh: {
        threshold: 60,
      },
      observeDOM: true, // 开启 observe-dom 插件
      observeImage: true, // 开启 observe-image 插件
      probeType: 3,
      click: true,
    });

    // 绑定事件
    bs.current.on("scroll", onScroll);
    bs.current.on("pullingDown", pullingDown);
    bs.current.on("pullingUp", pullingUp);
  });

  const onScroll = (pos: BScroll) => {
    // console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
  };

  // 下拉刷新
  const pullingDown = () => {
    // 判断是否滑动到了底部
    console.log("下拉刷新事件");
    bs.current.finishPullDown();
  };

  // 下拉刷新
  const pullingUp = () => {
    // 判断用户的上拉动作
    console.log("上拉加载事件");
    bs.current.finishPullUp();
  };

  return (
    <div className={styles.container} ref={scrollContaniner}>
      {children}
    </div>
  );
});

export default Scroll;
