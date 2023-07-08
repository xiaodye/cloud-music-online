import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles.css";
import { Artist } from "@/api/types";
import placeImg from "@/assets/music.png";
import { useNavigate } from "react-router-dom";

type IProps = {
  list: Artist[];
};

const SingerList: React.FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string | number) => {
    navigate(`/singer-detail/${id}`);
  };

  return (
    <ul className={styles.list}>
      {list.map((item, index) => (
        <li className={styles.listItem} key={item.accountId + "" + index} onClick={() => gotoDetail(item.id)}>
          <LazyLoadImage
            src={item.picUrl + "?param=300x300"}
            className={styles.listItemContent.cover}
            placeholderSrc={placeImg}
          />
          <div className={styles.listItemContent.name}>{item.name}</div>
        </li>
      ))}
    </ul>
  );
};

export default SingerList;
