import { OfficialListType } from "@/routes/home/routes/rank";
import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeImg from "@/assets/music.png";
import { useNavigate } from "react-router-dom";

interface IProps {
  list: OfficialListType[];
}

const OfficialRankList: React.FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string) => {
    navigate(`/album/${id}`);
  };

  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.listItem} onClick={() => gotoDetail(item.id)}>
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
