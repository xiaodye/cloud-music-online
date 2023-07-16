import { FC } from "react";
import styles from "./styles.module.scss";
import { usePlayerStore } from "@/store";
import PlayerBanner from "./PlayerBanner";

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{ name: "薛之谦" }],
};

const Player: FC = () => {
  return (
    <div className={styles.player}>
      <PlayerBanner song={currentSong} />
    </div>
  );
};

export default Player;
