import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import TabBar from "@/components/TabBar";
import { AlignLeftOutlined, AudioOutlined, SearchOutlined } from "@ant-design/icons";
import { useDrawerStore } from "@/store";

const Home: React.FC = () => {
  const { setShowDrawer } = useDrawerStore((state) => ({ setShowDrawer: state.setShowDrawer }));

  return (
    <div className={styles.home}>
      <div className={styles.top}>
        <AlignLeftOutlined className={styles.icon} onClick={() => setShowDrawer(true)} />

        <div className={styles.search}>
          <SearchOutlined style={{ color: "#2e3030" }} />
          <div className={styles.searchText}>请输入关键词</div>
        </div>

        <AudioOutlined className={styles.icon} />
      </div>

      <TabBar />
      <Outlet />
    </div>
  );
};

export default Home;
