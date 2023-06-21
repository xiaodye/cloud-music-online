import React from "react";
import styles from "./styles.module.scss";
import Slider from "@/components/Slider";
import RecommendList from "@/components/recommendList";

const bannerList = [
  {
    imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  },
  {
    imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  },
  {
    imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  },
  {
    imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  },
];

const recommendList = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  playCount: 172122,
  name: "朴树、许巍、李健、郑钧、老狼、赵雷",
}));

const Recommend: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.backgroud}></div>
      <Slider bannerList={bannerList} />
      <RecommendList list={recommendList} />
    </div>
  );
};

export default Recommend;
