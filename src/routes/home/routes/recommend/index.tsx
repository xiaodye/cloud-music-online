import React, { ElementRef, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Slider from "@/components/Slider";
import RecommendList from "@/components/recommendList";
import Scroll from "@/components/Scroll";
import useMount from "@/hooks/useMount";
import { getBannerListData, getRecommendListData } from "@/api/request";
import Loading from "@/baseUI/Loading";

const Recommend: React.FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);

  const bsRef = useRef<ElementRef<typeof Scroll>>({} as HTMLDivElement);

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
    <div className={styles.root}>
      <div className={styles.backgroud}></div>

      <Scroll ref={bsRef}>
        <div className={styles.content}>
          <Slider bannerList={bannerList} />
          <RecommendList list={recommendList} />
        </div>
      </Scroll>

      <Loading />
    </div>
  );
};

export default Recommend;
