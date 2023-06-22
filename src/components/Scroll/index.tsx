import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import styles from "./styles.module.scss";
import useMount from "@/hooks/useMount";
import useUnMount from "@/hooks/useUnmount";

// 使用上拉和下拉
BScroll.use(PullUp);
BScroll.use(PullDown);

type ScrollProps = {
  direction?: "vertical" | "horizental";
  click?: boolean;
  refresh?: boolean;
  bounceTop?: boolean; // 是否支持向上吸顶
  bounceBottom?: boolean; // 是否支持向下吸底
  pullUpLoading?: boolean; // 是否显示上拉 loading 动画
  pullDownLoading?: boolean; // 是否显示下拉 loading 动画
  onScroll?: () => void;
  pullUp?: () => void;
  pullDown?: () => void;
};

type Props = {
  options?: ScrollProps;
  children: React.ReactNode;
};

const defaulOptions = {
  direction: "vertical",
  click: true,
  refresh: true,
  bounceTop: true,
  bounceBottom: true,
  pullDownLoading: false,
  pullUpLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onScroll: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pullUp: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  pullDown: () => {},
};

const Scroll: React.FC<Props> = forwardRef(({ children, options = defaulOptions }, ref) => {
  const { direction, click, refresh, bounceTop, bounceBottom, pullDownLoading, pullUpLoading } = options;

  // const { pullUp, pullDown, onScroll } = options;

  // 暴露给外部组件使用
  useImperativeHandle(ref, () => ({
    refresh() {
      scrollInstance.current?.refresh();
      scrollInstance.current?.scrollTo(0, 0);
    },
  }));

  useMount(() => {
    scrollInstance.current?.on("scroll", onScroll);
    scrollInstance.current?.on("scrollEnd", scrollEnd);
    scrollInstance.current?.on("pullingUp", touchEnd);
  });

  useUnMount(() => {
    scrollInstance.current?.destroy();
    scrollInstance.current?.off("scroll");
    scrollInstance.current?.off("scrollEnd");
    scrollInstance.current?.off("pullingUp");
  });

  // current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaniner = useRef<HTMLDivElement>({} as HTMLDivElement);
  // 用于存储一个 BScroll 实例
  const scrollInstance = useRef<BScroll | null>(null);

  useEffect(() => {
    scrollInstance.current?.refresh();
  });

  useMount(() => {
    scrollInstance.current = new BScroll(scrollContaniner.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      pullUpLoad: {
        threshold: 20,
      },
      pullDownRefresh: true,
      probeType: 3,
      click: true,
      // bounce: {
      //   top: bounceTop,
      //   bottom: bounceBottom,
      // },
    });

    scrollInstance.current?.on("scroll", onScroll);
    scrollInstance.current?.on("scrollEnd", scrollEnd);
    scrollInstance.current?.on("pullingUp", touchEnd);
  });

  const onScroll = (pos: BScroll) => {
    // console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
  };

  const scrollEnd = (bsIns: BScroll) => {
    // 判断是否滑动到了底部
    console.log("下拉事件-1");

    if (bsIns.y <= bsIns.maxScrollY + 100) {
      console.log("下拉事件");
    }
  };

  const touchEnd = () => {
    // 判断用户的下拉动作
    console.log("上拉事件");
    scrollInstance.current?.refresh();
  };

  return (
    <div className={styles.container} ref={scrollContaniner}>
      {children}
    </div>
  );
});

export default Scroll;
