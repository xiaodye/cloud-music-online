import Horizen from "@/baseUI/horizen";
import React, { useState } from "react";
import { alphaTypes, categoryTypes, getSingerListData } from "@/api/request";
import { scrollContainer, singers } from "./styles.css";
import Scroll from "@/components/Scroll";
import SingerList from "@/components/singerList";
import { Artist } from "@/api/type";
import useMount from "@/hooks/useMount";

const Singers: React.FC = () => {
  const [singerList, setSingerList] = useState<Artist[]>([]);
  const [pullUpIsLoading, setpullUpIsLoading] = useState(true);
  const [pullDownIsLoading, setPullDownisLoading] = useState(true);

  useMount(async () => {
    const res = await getSingerListData("华语男", "A", 1);
    setSingerList(res.artists);
  });

  const onPullDown = () => {
    console.log("下拉刷新");

    setPullDownisLoading(true);
    setTimeout(() => {
      setPullDownisLoading(false);
    }, 2000);
  };

  const onPullUp = () => {
    if (pullUpIsLoading) return;
    console.log("上拉加载");
    setpullUpIsLoading(true);
    setTimeout(() => {
      setpullUpIsLoading(false);
      console.log("完成");
    }, 2000);
  };

  return (
    <div className={singers}>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"} />
      <Horizen list={alphaTypes} title={"首字母:"} />

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
    </div>
  );
};

export default Singers;
