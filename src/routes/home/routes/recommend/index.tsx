import React, { ElementRef, useRef, useState } from "react";
import Slider from "@/components/Slider";
import RecommendList from "@/components/recommendList";
import Scroll from "@/components/Scroll";
import useMount from "@/hooks/useMount";
import { getBannerListData, getRecommendListData } from "@/api/request";
import Loading from "@/baseUI/Loading";
import { root, backgroud, content } from "./styles.css";

const Recommend: React.FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);

  const bsRef = useRef<ElementRef<typeof Scroll>>({} as ElementRef<typeof Scroll>);

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
      {/* <div className={backgroud}></div> */}

      <Scroll ref={bsRef}>
        {/* <Slider bannerList={bannerList} /> */}
        <RecommendList list={recommendList} />
      </Scroll>

      <Loading />
    </div>
  );
};

export default Recommend;
