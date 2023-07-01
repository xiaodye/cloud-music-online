import { GlobalListType } from "@/routes/home/routes/rank";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeImg from "@/assets/music.png";

interface IProps {
  list: GlobalListType[];
}

const GlobalRankList: React.FC<IProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <LazyLoadImage src={item.coverImgUrl} alt="cover" placeholderSrc={placeImg} />
          <span className={styles.desc}>{item.updateFrequency}</span>
        </li>
      ))}
    </ul>
  );
};

export default GlobalRankList;
