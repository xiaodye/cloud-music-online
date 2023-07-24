import Horizen from "@/baseUI/horizen";
import React, { useEffect, useRef, useState } from "react";
import { alphaTypes, areaList, getSingerListData } from "@/api/request";
import { scrollContainer, singers } from "./styles.css";
import Scroll, { PullUpStateType, ScrollRef } from "@/components/Scroll";
import SingerList from "@/components/singerList";
import { Artist } from "@/api/types";
import useMount from "@/hooks/useMount";
import Loading from "@/baseUI/Loading";

type SingerOptionsType = {
  area: string;
  alpha: string;
  offset: number;
};

const Singers: React.FC = () => {
  const [singerList, setSingerList] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [pullUpIsLoading, setPullUpIsLoading] = useState(false);
  const [pullDownIsLoading, setPullDownIsLoading] = useState(false);
  const [options, setOptions] = useState<SingerOptionsType>({
    area: "-1",
    alpha: "A",
    offset: 0,
  });

  const scrollRef = useRef<ScrollRef>({} as ScrollRef);
  const singerListMap = useRef<Map<string, Artist[]>>(new Map());
  const [pullUpState, setPullUpState] = useState<PullUpStateType>("more");

  useMount(() => {
    getSingerList(options.area, options.alpha, options.offset);
  });

  useEffect(() => {
    getSingerList(options.area, options.alpha, options.offset);
  }, [options]);

  /**
   * 获取歌手列表
   * @param area 分类
   * @param alpha 首字母
   * @param offset 数量
   */
  const getSingerList = async (area: string, alpha: string, offset: number) => {
    const key = `${area}-${alpha}`;
    if (singerListMap.current.has(key)) {
      setSingerList(singerListMap.current.get(key)!);
      return;
    }

    setIsLoading(true);
    const res = await getSingerListData(area, alpha, offset);
    setSingerList(res.artists);

    // 在 map 做缓存，避免不必要的请求
    singerListMap.current.set(key, res.artists);

    setIsLoading(false);
  };

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
   * 下拉刷新
   */
  const onPullDown = async () => {
    // 节流
    if (pullDownIsLoading) return;

    setPullDownIsLoading(true);
    await getSingerList(options.area, options.alpha, options.offset);

    setTimeout(() => {
      setPullDownIsLoading(false);
      scrollRef.current.finishPullDown();
    }, 2000);
  };

  /**
   * 上拉加载更多
   */
  const onPullUp = () => {
    // 节流处理
    if (pullUpState === "loading") return;

    // 当状态为 noMore，直接结束上拉状态
    if (pullUpState === "noMore") {
      scrollRef.current.finishPullUp();
    }

    setPullUpState("loading");

    setTimeout(() => {
      scrollRef.current.finishPullUp();
      setPullUpState("more");
    }, 2000);
  };

  return (
    <div className={singers}>
      <Horizen list={areaList} title={"分类:"} onClick={changeArea} />
      <Horizen list={alphaTypes} title={"首字母:"} onClick={changeAlpha} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className={scrollContainer}>
          <Scroll
            isPullDownRefresh={true}
            isPullUpLoad={true}
            pullUp={onPullUp}
            pullDown={onPullDown}
            pullDownLoading={pullDownIsLoading}
            pullUpState={pullUpState}
            ref={scrollRef}
          >
            <SingerList list={singerList} />
          </Scroll>
        </div>
      )}
    </div>
  );
};

export default Singers;
