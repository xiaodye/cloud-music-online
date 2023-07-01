import { OfficialListType } from "@/routes/home/routes/rank";
import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import Loading from "@/baseUI/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeImg from "@/assets/music.png";

interface IProps {
  list: OfficialListType[];
  isLoading: boolean;
}

const OfficialRankList: React.FC<IProps> = ({ list, isLoading }) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <LazyLoadImage
            src={item.coverImgUrl}
            placeholderSrc={placeImg}
            alt="cover"
            className={styles.listItemCover}
          />
          <ul className={styles.songList}>
            {item.tracks.map((item, index) => (
              <li key={item.first} className={classNames(styles.songListItem, "text-noWrap")}>{`${index + 1}. ${
                item.first
              } - ${item.second}`}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default OfficialRankList;
