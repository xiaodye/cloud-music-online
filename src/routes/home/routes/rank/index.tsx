import { getRankListRequest } from "@/api/request";
import useMount from "@/hooks/useMount";
import { useState } from "react";
import styles from "./styles.module.scss";
import OfficialRankList from "@/components/officialRankList";
import Scroll from "@/components/Scroll";
import GlobalRankList from "@/components/globalRankList";

export type OfficialListType = {
  id: string;
  coverImgUrl: string;
  tracks: { first: string; second: string }[];
};

export type GlobalListType = {
  id: string;
  coverImgUrl: string;
  tracks: { first: string; second: string }[];
  updateFrequency: string;
};

const Rank: React.FC = () => {
  const [officialList, setOfficialList] = useState<OfficialListType[]>([]);
  const [globalList, setGlobalList] = useState<GlobalListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useMount(async () => {
    const { officialList, globalList } = await getRankList();

    setOfficialList(officialList);
    setGlobalList(globalList);
  });

  const getRankList = async () => {
    setIsLoading(true);
    const { data } = await getRankListRequest();

    const officialList: OfficialListType[] = data.list.filter((item: OfficialListType) => item.tracks.length !== 0);
    const globalList: GlobalListType[] = data.list.filter((item: GlobalListType) => item.tracks.length === 0);
    setIsLoading(false);
    return { officialList, globalList };
  };

  return (
    <div className={styles.rank}>
      <Scroll>
        <h1 className={styles.title}>官方榜</h1>
        <OfficialRankList list={officialList} isLoading={isLoading} />
        <h1 className={styles.title}>全球榜</h1>
        <GlobalRankList list={globalList} />
      </Scroll>
    </div>
  );
};

export default Rank;
