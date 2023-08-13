import Horizen from "@/baseUI/horizen";
import React, { useEffect, useRef, useState } from "react";
import { alphaTypes, areaList, getSingerListData } from "@/api/request";
import { scrollContainer, singers } from "./styles.css";
import Scroll, { ScrollRef } from "@/components/Scroll";
import SingerList from "@/components/singerList";
import { Artist } from "@/api/types";
import Loading from "@/baseUI/Loading";
import { useImmer } from "use-immer";
import { SingerListMapType, SingerOptionsType } from "./types";
import { FixedSizeList } from "react-window";

const Singers: React.FC = () => {
  const [currentSingerList, setCurrentSingerList] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useImmer<SingerOptionsType>({
    area: "-1",
    alpha: "A",
    pullUpState: "more",
  });

  const scrollRef = useRef<ScrollRef>(null);
  const singerListMap = useRef<Map<string, SingerListMapType>>(new Map());
  // const [pullUpState, setPullUpState] = useState<PullUpStateType>("more");

  // 用于处理闭包导致获取不到最新状态的问题
  const optionsRef = useRef<{ area: string; alpha: string }>({
    area: "-1",
    alpha: "A",
  });

  // 监听 area 和 alpha 改变
  useEffect(() => {
    optionsRef.current.area = options.area;
    optionsRef.current.alpha = options.alpha;

    togglePanel(options.area, options.alpha);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.area, options.alpha]);

  /**
   * 改变区域
   * @param value
   */
  const changeArea = (value: string) => {
    setOptions({ ...options, area: value });
  };

  /**
   * 改变首字母
   * @param value
   */
  const changeAlpha = (value: string) => {
    setOptions({ ...options, alpha: value });
  };

  /**
   * 切换面板，当点击切换首字母和区域时，均会触发此函数
   * @param area
   * @param alpha
   * @returns
   */
  const togglePanel = async (area: string, alpha: string) => {
    // 1. 切换歌手区域和首字母的时候，如果 map 有缓存，先走 map 的缓存
    const key = `${area}-${alpha}`;
    if (singerListMap.current.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const singerMap = singerListMap.current.get(key)!;
      setCurrentSingerList(singerMap.singerList);
      setOptions((options) => {
        options.pullUpState = singerMap.more ? "more" : "noMore";
      });
      return;
    }

    // 2. map 中未找到缓存, 请求数据(相当于第一次做请求)，并在 map 中做缓存
    setIsLoading(true);

    const res = await getSingerListData(area, alpha, 0);
    singerListMap.current.set(key, { singerList: res.artists, offset: 30, more: res.more });

    // 设置展示数据
    setCurrentSingerList(singerListMap.current.get(key)?.singerList ?? []);
    setOptions((options) => {
      options.pullUpState = res.more ? "more" : "noMore";
    });

    setIsLoading(false);
  };

  /**
   * 上拉加载更多
   * @param area
   * @param alpha
   * @returns
   */
  const loadMore = async (area: string, alpha: string) => {
    // 节流处理
    if (options.pullUpState === "loading") return;

    // 当状态为 noMore，没有更多了，直接结束上拉状态
    if (options.pullUpState === "noMore") {
      scrollRef.current?.finishPullUp();
    }

    // 设置 pullUpState 为 loading
    setOptions((options) => {
      options.pullUpState = "loading";
    });

    // 根据 key 获取对应 map 缓存
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const singerMap = singerListMap.current.get(`${area}-${alpha}`)!;

    // 更新 key 对应的 map 缓存, 把新的数据添加到列表的末尾去
    const { artists, more } = await getSingerListData(area, alpha, singerMap.offset);

    singerMap.singerList = [...singerMap.singerList, ...artists];
    singerMap.offset += 30;
    singerMap.more = more;

    // 设置展示数据
    setCurrentSingerList(singerMap.singerList);

    // 根据 more 设置 pullUpState
    setOptions((options) => {
      options.pullUpState = singerMap.more ? "more" : "noMore";
    });

    // 结束上拉状态
    scrollRef.current?.finishPullUp();
  };

  return (
    <div className={singers}>
      <Horizen list={areaList} title={"区域:"} onClick={changeArea} />
      <Horizen list={alphaTypes} title={"首字母:"} onClick={changeAlpha} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className={scrollContainer}>
          <Scroll
            isPullUpLoad={true}
            pullUp={() => loadMore(optionsRef.current.area, optionsRef.current.alpha)}
            pullUpState={options.pullUpState}
            ref={scrollRef}
          >
            <SingerList list={currentSingerList} />
          </Scroll>
        </div>
      )}
    </div>
  );
};

export default Singers;
