import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import Banner from "@/components/Banner";
import Scroll from "@/components/Scroll";
import { useNavigate, useParams } from "react-router-dom";
import SongList from "@/components/songList";
import useMount from "@/hooks/useMount";
import { getSingerInfoRequest } from "@/api/request";
import { SingerDetailType } from "@/api/types";
import Loading from "@/baseUI/Loading";
import { PlusOutlined } from "@ant-design/icons";

const SingerDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [singerDetail, setSingerDetail] = useState<SingerDetailType>({} as SingerDetailType);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setShow(false);
  };

  useMount(async () => {
    const res = await getSingerInfoRequest(Number(params.id!));

    setSingerDetail(res);
    setLoading(false);
  });

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear
      unmountOnExit
      classNames={{
        appear: styles.flyAppear,
        appearActive: styles.flyAppearActive,
        enter: styles.flyEnter,
        enterActive: styles.flyEnterActive,
        exit: styles.flyExit,
        exitActive: styles.flyExitActive,
      }}
      onExited={() => navigate(-1)}
    >
      <div className={styles.singerDetail}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Banner title={singerDetail.artist.name} onClick={handleClick} />
            <div className={styles.singerBg} style={{ backgroundImage: `url(${singerDetail.artist.picUrl})` }}></div>
            <div className={styles.collectBtn}>
              <PlusOutlined className={styles.icon} />
              <span className={styles.text}> 收藏 </span>
            </div>
            <div className={styles.singerListWrapper}>
              <Scroll bounceTop={false}>
                <SongList list={singerDetail.hotSongs} style={{ backgroundColor: "#fff" }} />
              </Scroll>
            </div>
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default SingerDetail;
