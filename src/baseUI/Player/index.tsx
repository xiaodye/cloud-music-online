import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import PlayerBanner from "./PlayerBanner";
import FullScreenPlayer from "./FullScreenPlayer";
import { usePlayerStore } from "@/store";
import useMount from "@/hooks/useMount";
import { getSongUrl } from "@/utils/utils";

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{ name: "薛之谦" }],
};

//mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
const playList = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: "01",
    crbt: null,
    no: 1,
    st: 0,
    rt: "",
    cf: "",
    alia: ["手游《梦幻花园》苏州园林版推广曲"],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814,
    },
    mv: 0,
    al: {
      id: 84991301,
      name: "拾梦纪",
      picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
      tns: [],
      pic_str: "109951164627180052",
      pic: 109951164627180050,
    },
    name: "拾梦纪",
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672,
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277,
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: "妖扬",
        tns: [],
        alias: [],
      },
      {
        id: 12578371,
        name: "金天",
        tns: [],
        alias: [],
      },
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null,
  },
];

const Player: FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const [currentSong, setCurrentSong] = usePlayerStore((state) => [state.currentSong, state.setCurrentSong]);
  const [currentIndex, setCurrentIndex] = usePlayerStore((state) => [state.currentIndex, state.setCurrentIndex]);

  const percent = Number.isNaN(currentTime / duration) ? 0 : currentTime / duration;

  useMount(() => {
    if (!currentSong) return;

    setCurrentIndex(0);
    const current = playList[0];
    setCurrentSong(current);

    audioRef.current.src = getSongUrl(current.id);

    // setTimeout(() => {
    //   audioRef.current.play();
    // });

    // audioRef.current.pause();

    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  });

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <div className={styles.player}>
      <PlayerBanner song={currentSong} />
      <FullScreenPlayer song={currentSong} />
      <audio src="" ref={audioRef}></audio>
    </div>
  );
};

export default Player;
