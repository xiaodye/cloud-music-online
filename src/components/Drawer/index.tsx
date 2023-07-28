import { FC } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useDrawerStore, useUserStore } from "@/store";
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
  const userInfo = useUserStore((state) => state.userInfo);
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
          <img
            src={userInfo.avatarUrl === "" ? "https://s2.loli.net/2023/02/02/4NeR7YMnjSxhPAQ.jpg" : userInfo.avatarUrl}
            className={styles.topAvatar}
          />
          <div className={classNames(styles.topNickname, "text-noWrap")}>
            {userInfo.nickname === "" ? (
              <div className={styles.topBtn} onClick={gotoLogin}>
                立即登录
              </div>
            ) : (
              userInfo.nickname
            )}
          </div>
        </div>

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20 }} />
            我喜欢
          </li>
          <li className={styles.menuItem}>
            <TrophyTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
            我的音乐
          </li>
          <li className={styles.menuItem}>
            <TagsTwoTone style={{ fontSize: 20 }} />
            我的歌单
          </li>
          <li className={styles.menuItem}>
            {" "}
            <StarTwoTone twoToneColor="#eb2f96" style={{ fontSize: 20 }} />
            我的收藏
          </li>
          <li className={styles.menuItem}>
            {" "}
            <CustomerServiceTwoTone style={{ fontSize: 20 }} />
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
