import styles from "./styles.module.scss";
import { Carousel } from "antd";

type IProps = {
  bannerList: { imageUrl: string }[];
};

const Slider: React.FC<IProps> = ({ bannerList }) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div className={styles.root}>
      <Carousel afterChange={onChange} className={styles.carousel}>
        {bannerList.map((item, index) => (
          <div key={index}>
            <img key={index} src={item.imageUrl} alt="img" className={styles.carouselItem} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
