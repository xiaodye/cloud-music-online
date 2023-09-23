import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeImg from "@/assets/music.png";

import "swiper/swiper-bundle.css";

type IProps = {
  bannerList: { imageUrl: string }[];
};

const Slider: React.FC<IProps> = ({ bannerList }) => {
  return (
    <div className={styles.root}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        autoplay={true}
        loop={true}
        spaceBetween={15}
        className={styles.swiper}
      >
        {bannerList.map((item, index) => (
          <SwiperSlide key={index} className={styles.swiperItem}>
            <LazyLoadImage key={index} src={item.imageUrl} placeholderSrc={placeImg} alt="img" className={styles.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    // </div>
  );
};

export default Slider;
