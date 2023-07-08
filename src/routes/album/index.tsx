import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import animation from "./animation.module.css";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import Banner from "@/components/Banner";
import Scroll from "@/components/Scroll";
import SongList from "@/components/songList";
import { getCount } from "@/utils/utils";
import classNames from "classnames";

const Album: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  //mock 数据
  const currentAlbum = {
    creator: {
      avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      nickname: "浪里推舟",
    },
    coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks: [
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
    ],
  };

  const handleBack = () => {
    setShow(false);
  };

  return (
    <CSSTransition
      in={show}
      timeout={300}
      unmountOnExit
      classNames={{
        appear: animation.flyAppear,
        appearActive: animation.flyAppearActive,
        enter: animation.flyEnter,
        enterActive: animation.flyEnterActive,
        exit: animation.flyExit,
        exitActive: animation.flyExitActive,
      }}
      appear={true}
      onExited={() => navigate(-1)}
    >
      <div className={styles.album}>
        <Banner onClick={handleBack} />
        <Scroll>
          <header className={styles.header}>
            <div className={styles.background} style={{ backgroundImage: `url(${currentAlbum.coverImgUrl})` }}></div>

            <div className={styles.albumContainer}>
              <div className={styles.coverWrapper}>
                <div className={styles.decorate}>
                  <i className="iconfont play">&#xe885;</i>
                  <span className={styles.count}>{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
                </div>
                <img src={currentAlbum.coverImgUrl} alt="cover" />
              </div>
              <div className={styles.albumDesc}>
                <div className={styles.albumDescTitle}>{currentAlbum.name}</div>
                <div className={styles.albumDescPerson}>
                  <img className={styles.avatar} src={currentAlbum.creator.avatarUrl}></img>
                  <span className={styles.songer}>{currentAlbum.creator.nickname}</span>
                </div>
              </div>
            </div>

            <div className={styles.menu}>
              <div className={styles.menuItem}>
                <i className="iconfont">&#xe6ad;</i>
                评论
              </div>
              <div className={styles.menuItem}>
                <i className="iconfont">&#xe86f;</i>
                点赞
              </div>
              <div className={styles.menuItem}>
                <i className="iconfont">&#xe62d;</i>
                收藏
              </div>
              <div className={styles.menuItem}>
                <i className="iconfont">&#xe606;</i>
                更多
              </div>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.firstLine}>
              <div className={styles.playAll}>
                <i className={classNames("iconfont", styles.icon)}>&#xe6e3;</i>
                <div>
                  <span>播放全部</span>
                  <span className={styles.num}>（共 {currentAlbum.tracks.length} 首）</span>
                </div>
              </div>
              <div className={styles.btn}>
                <i className="iconfont">&#xe62d;</i>
                <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
              </div>
            </div>
            <SongList list={currentAlbum.tracks} />
          </main>
        </Scroll>
      </div>
    </CSSTransition>
  );
};

export default Album;
