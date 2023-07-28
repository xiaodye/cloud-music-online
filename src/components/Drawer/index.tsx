import { FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useDrawerStore } from "@/store";
import {
  CustomerServiceTwoTone,
  HeartTwoTone,
  SettingTwoTone,
  StarTwoTone,
  TagsTwoTone,
  TrophyTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Drawer: FC = () => {
  const [show, setShow] = useDrawerStore((state) => [state.showDrawer, state.setShowDrawer]);
  const navigate = useNavigate();

  const gotoLogin = () => {
    setShow(false);
    navigate("/login");
  };

  return (
    <section className={classNames(styles.drawer, show ? styles.show : "")} onClick={() => setShow(false)}>
      <div
        className={classNames(styles.drawerContent, show ? styles.contentShow : "")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <img src="https://s2.loli.net/2023/03/14/Wou5OES6YHn1JeM.jpg" className={styles.topAvatar} />
          <div className={classNames(styles.topNickname, "text-noWrap")} onClick={gotoLogin}>
            不止所措的染 🤣
          </div>
        </div>

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <HeartTwoTone twoToneColor="#eb2f96" />
            我喜欢
          </li>
          <li className={styles.menuItem}>
            <TrophyTwoTone twoToneColor="#52c41a" />
            我的音乐
          </li>
          <li className={styles.menuItem}>
            <TagsTwoTone />
            我的歌单
          </li>
          <li className={styles.menuItem}>
            {" "}
            <StarTwoTone twoToneColor="#eb2f96" />
            我的收藏
          </li>
          <li className={styles.menuItem}>
            {" "}
            <CustomerServiceTwoTone />
            播放历史
          </li>
        </ul>

        <div className={styles.footer}>
          <div className={styles.logout}>退出登录</div>

          <SettingTwoTone />
        </div>
      </div>
    </section>
  );
};

export default Drawer;
