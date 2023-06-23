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

  useMount(async () => {
    const res = await getSingerListData("华语男", "A", 1);
    setSingerList(res.artists);
  });

  return (
    <div className={singers}>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"} />
      <Horizen list={alphaTypes} title={"首字母:"} />

      <div className={scrollContainer}>
        <Scroll>
          <SingerList list={singerList} />
        </Scroll>
      </div>
    </div>
  );
};

export default Singers;
