import React, { useRef, useState } from "react";
import Slider from "@/components/Slider";
import RecommendList from "@/components/recommendList";
import Scroll, { ScrollRef } from "@/components/Scroll";
import useMount from "@/hooks/useMount";
import { getBannerListData, getRecommendListData } from "@/api/request";
import { root } from "./styles.css";

const Recommend: React.FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);

  const scrollRef = useRef<ScrollRef>({} as ScrollRef);

  useMount(async () => {
    getBannerList();
    getRecommendList();
  });

  const getBannerList = async () => {
    const res = await getBannerListData();
    const data = res as any;
    setBannerList(data.banners);
  };

  const getRecommendList = async () => {
    const res = await getRecommendListData();
    const data = res as any;
    setRecommendList(data.result);
  };

  return (
    <div className={root}>
      <Scroll ref={scrollRef}>
        <Slider bannerList={bannerList} />
        <RecommendList list={recommendList} />
      </Scroll>
    </div>
  );
};

export default Recommend;
