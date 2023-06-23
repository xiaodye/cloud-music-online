import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles.css";
import { Artist } from "@/api/type";
import placeImg from "@/assets/music.png";

type IProps = {
  list: Artist[];
};

const SingerList: React.FC<IProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <li className={styles.listItem} key={index}>
          <LazyLoadImage src={item.picUrl} className={styles.listItemContent.cover} placeholderSrc={placeImg} />
          <div className={styles.listItemContent.name}>{item.name}</div>
        </li>
      ))}
    </ul>
  );
};

export default SingerList;
