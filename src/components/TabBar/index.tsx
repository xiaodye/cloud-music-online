import { FC, useMemo } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const TabBar: FC = () => {
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
    <div className={styles.tab}>
      {tabs.map((item, index) => (
        <NavLink to={item.path} key={index} className={getNavLinkClassName}>
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};

export default TabBar;
