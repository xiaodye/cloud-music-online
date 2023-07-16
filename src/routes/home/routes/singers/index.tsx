import Horizen from "@/baseUI/horizen";
import React, { useState } from "react";
import { alphaTypes, categoryTypes, getSingerListData } from "@/api/request";
import { scrollContainer, singers } from "./styles.css";
import Scroll from "@/components/Scroll";
import SingerList from "@/components/singerList";
import { Artist } from "@/api/types";
import useMount from "@/hooks/useMount";
import Loading from "@/baseUI/Loading";

const Singers: React.FC = () => {
  const [singerList, setSingerList] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pullUpIsLoading, setPullUpIsLoading] = useState(false);
  const [pullDownIsLoading, setPullDownIsLoading] = useState(false);

  useMount(() => {
    getSingerList();
  });

  const getSingerList = async () => {
    setIsLoading(true);
    const res = await getSingerListData("华语男", "A", 1);
    setSingerList(res.artists);
    setIsLoading(false);
  };

  const onPullDown = async () => {
    setPullDownIsLoading(true);
    getSingerList();
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
