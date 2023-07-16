import { NavLink, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import { useMemo, useState } from "react";
import classNames from "classnames";
import Player from "@/baseUI/Player";

const Home: React.FC = () => {
  const tabs = useMemo(
    () => [
      {
        path: "/home/recommend",
        text: "推荐",
      },
      {
        path: "/home/singers",
        text: "歌手",
      },
      {
        path: "/home/rank",
        text: "排行榜",
      },
    ],
    []
  );

  const getNavLinkClassName = ({ isActive }: { isActive: boolean; isPending: boolean }) => {
    return isActive ? classNames(styles.tabItem, styles.active) : styles.tabItem;
  };

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">云音悦</span>
        <span className="iconfont search">&#xe62b;</span>
      </div>
      <div className={styles.tab}>
        {tabs.map((item, index) => (
          <NavLink to={item.path} key={index} className={getNavLinkClassName}>
            {item.text}
          </NavLink>
        ))}
      </div>

      <Outlet />

      <Player />
    </div>
  );
};

export default Home;
