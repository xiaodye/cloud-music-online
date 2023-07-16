import Horizen from "@/baseUI/horizen";
import React, { useEffect, useState } from "react";
import { alphaTypes, areaList, getSingerListData } from "@/api/request";
import { scrollContainer, singers } from "./styles.css";
import Scroll from "@/components/Scroll";
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
  const [pullUpIsLoading, setPullUpIsLoading] = useState(false);
  const [pullDownIsLoading, setPullDownIsLoading] = useState(false);
  const [options, setOptions] = useState<SingerOptionsType>({
    area: "-1",
    alpha: "A",
    offset: 0,
  });

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
    setIsLoading(true);
    const res = await getSingerListData(area, alpha, offset);
    setSingerList(res.artists);
    setIsLoading(false);
  };

  const changeArea = (value: string) => {
    setOptions({ ...options, area: value });
  };

  const changeAlpha = (value: string) => {
    setOptions({ ...options, alpha: value });
  };

  const onPullDown = async () => {
    setPullDownIsLoading(true);
    getSingerList(options.area, options.alpha, options.offset);
    setTimeout(() => {
      setPullDownIsLoading(false);
    }, 1000);
  };

  const onPullUp = () => {
    setPullUpIsLoading(true);
    setTimeout(() => {
      setPullUpIsLoading(false);
    }, 2000);
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className={singers}>
      <Horizen list={areaList} title={"分类:"} onClick={changeArea} />
      <Horizen list={alphaTypes} title={"首字母:"} onClick={changeAlpha} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className={scrollContainer}>
          <Scroll
            pullUp={onPullUp}
            pullDown={onPullDown}
            pullDownLoading={pullDownIsLoading}
            pullUpLoading={pullUpIsLoading}
          >
            <SingerList list={singerList} />
          </Scroll>
        </div>
      )}
    </div>
  );
};

export default Singers;
