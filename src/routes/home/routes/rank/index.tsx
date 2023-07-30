import { getRankListRequest } from "@/api/request";
import useMount from "@/hooks/useMount";
import { useState } from "react";
import styles from "./styles.module.scss";
import OfficialRankList from "@/components/officialRankList";
import Scroll from "@/components/Scroll";
import GlobalRankList from "@/components/globalRankList";
import Loading from "@/baseUI/Loading";
import { RankListType } from "@/api/types";

const Rank: React.FC = () => {
  const [officialList, setOfficialList] = useState<RankListType[]>([]);
  const [globalList, setGlobalList] = useState<RankListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useMount(async () => {
    const { officialList, globalList } = await getRankList();

    setOfficialList(officialList);
    setGlobalList(globalList);
  });

  const getRankList = async () => {
    setIsLoading(true);
    const res = await getRankListRequest();

    const officialList = res.list.filter((item) => item.tracks.length !== 0);
    const globalList = res.list.filter((item) => item.tracks.length === 0);
    setIsLoading(false);
    return { officialList, globalList };
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.rank}>
      <Scroll>
        <h1 key={1} className={styles.title}>
          官方榜
        </h1>
        <OfficialRankList list={officialList} />
        <h1 key={3} className={styles.title}>
          全球榜
        </h1>
        <GlobalRankList list={globalList} />
      </Scroll>
    </div>
  );
};

export default Rank;
