import React, { ElementRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Slider from "@/components/Slider";
import RecommendList from "@/components/recommendList";
import Scroll from "@/components/Scroll";
import { PullRefresh, Toast } from "react-vant";
import useMount from "@/hooks/useMount";
import { getBannerListData, getRecommendListData } from "@/api/request";
import Loading from "@/baseUI/Loading";

const recommendList = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  playCount: 172122,
  name: "朴树、许巍、李健、郑钧、老狼、赵雷",
}));

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

  const onRefresh = (showToast: boolean) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (showToast) {
          Toast.info("刷新成功");
        }

        resolve(true);
      }, 1000);
    });
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
