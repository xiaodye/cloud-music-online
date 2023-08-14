import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles.css";
import { Artist } from "@/api/types";
import placeImg from "@/assets/music.png";
import { useNavigate } from "react-router-dom";
import { FixedSizeList, areEqual } from "react-window";
import { memo } from "react";

type IProps = {
  list: Artist[];
};

type RowProps = {
  data: Artist[];
  index: number;
  style: React.CSSProperties;
};

const Row: React.FC<RowProps> = memo(({ data, index, style }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string | number) => {
    navigate(`/singer-detail/${id}`);
  };

  return (
    <li
      style={style}
      className={styles.listItem}
      key={data[index].accountId + "" + index}
      onClick={() => gotoDetail(data[index].id)}
    >
      <LazyLoadImage
        src={data[index].picUrl + "?param=300x300"}
        className={styles.listItemContent.cover}
        placeholderSrc={placeImg}
      />
      <div className={styles.listItemContent.name}>{data[index].name}</div>
    </li>
  );
}, areEqual);

const VirtualSingerList: React.FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string | number) => {
    navigate(`/singer-detail/${id}`);
  };

  return (
    <>
      <FixedSizeList
        itemData={list}
        height={609}
        width={"100vw"}
        itemSize={70}
        itemCount={list.length}
        innerElementType="ul"
      >
        {({ data, index, style }) => (
          <li
            style={style}
            className={styles.listItem}
            key={data[index].accountId + "" + index}
            onClick={() => gotoDetail(data[index].id)}
          >
            <LazyLoadImage
              src={data[index].picUrl + "?param=300x300"}
              className={styles.listItemContent.cover}
              placeholderSrc={placeImg}
            />
            <div className={styles.listItemContent.name}>{data[index].name}</div>
          </li>
        )}
      </FixedSizeList>
    </>
  );
};

export default VirtualSingerList;
