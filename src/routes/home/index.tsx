import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import TabBar from "@/components/TabBar";
import classNames from "classnames";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <i className={classNames("iconfont", styles.iconAside)}>&#xe65c;</i>

        <div className={styles.search}>
          <SearchOutlined />
          <input className={styles.searchInput} type="text" placeholder="请输入关键词" />
        </div>

        <AudioOutlined style={{ color: "#fff", fontSize: 22 }} />
      </div>

      <TabBar />
      <Outlet />
    </div>
  );
};

export default Home;
