import { FC, SyntheticEvent, createContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import PlayerBanner from "./PlayerBanner";
import FullScreenPlayer from "./FullScreenPlayer";
import { usePlayerStore } from "@/store";
import useMount from "@/hooks/useMount";
import { getSongUrl } from "@/utils/utils";
import { PlayMode } from "@/store/player/types";
import PlayList from "@/components/PlayList";
import useTogglePlayMode from "@/hooks/useTogglePlayMode";
import { SongType } from "@/api/types";
import { getLyricRequest } from "@/api/request";
// import Lyric, { LineType, LyricLineType } from "@/utils/lyric-parser";

export type LyricLineType = {
  time: number;
  txt: string;
};

type ContextType = {
  setSongProgress: (percent: number) => void;
};

const songList: SongType[] = [
  {
    id: 1416767593,
    name: "拾梦纪",
    al: {
      id: 84991301,
      name: "拾梦纪",
      picUrl: "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
    },

    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: "妖扬",
      },
      {
        id: 12578371,
        name: "金天",
      },
    ],
  },
];

export const SongContext = createContext<ContextType>({} as ContextType);

const Player: FC = () => {
  const [currentTime, setCurrentTime] = usePlayerStore((state) => [state.currentTime, state.setCurrentTime]);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const [currentSong, setCurrentSong] = usePlayerStore((state) => [state.currentSong, state.setCurrentSong]);
  const [currentIndex, setCurrentIndex] = usePlayerStore((state) => [state.currentIndex, state.setCurrentIndex]);
  const [percent, setPercent] = usePlayerStore((state) => [state.percent, state.setPercent]);
  const [playMode, setPlayMode] = usePlayerStore((state) => [state.playMode, state.setPlayMode]);
  const [playList, setPlayList] = usePlayerStore((state) => [state.playList, state.setPlayList]);
  const [isFirst, setIsFirst] = usePlayerStore((state) => [state.isFirst, state.setIsFirst]);
  const [sequencePlayList, setSequencePlayList] = usePlayerStore((state) => [
    state.sequencePlayList,
    state.setSequencePlayList,
  ]);

  const [lyricLines, setLyricLines] = useState<LyricLineType[]>([]);

  const { togglePlayMode } = useTogglePlayMode();

  // 当应用启动时，store 可能没有数据，手动填充一条
  useMount(() => {
    if (playList.length === 0) {
      setSequencePlayList(songList);
      setPlayList(songList);
      setCurrentSong(songList[0]);
      setPlayMode(PlayMode.SEQUENCE);
    }

    // 应用启动时，做的设置
    audioRef.current.src = getSongUrl(currentSong.id);
    getLyric(currentSong.id);
    setCurrentTime(0); // 从 0 开始
    setDuration((currentSong.dt / 1000) | 0); // 时长
  });

  // 切换索引会触发播放
  // 播放逻辑
  // 1. 根据索引从歌曲中拿到播放的歌曲
  // 2. 根据 id 播放设置 audio.src
  // 3. 设置 playing -> true
  // 4. 计算 duration, 重置 currentTime -> 0
  // 5. 播放歌曲，audio.current.play()
  useEffect(() => {
    // 应用第一次启动时，不做处理
    if (isFirst) {
      setIsFirst(false);
      return;
    }

    if (playList.length === 0 || currentSong === playList[currentIndex]) {
      return;
    }

    const song = playList[currentIndex];
    setCurrentSong(song);
    audioRef.current.src = getSongUrl(song.id);

    getLyric(currentSong.id);
    setCurrentTime(0); // 从 0 开始
    setDuration((song.dt / 1000) | 0); // 时长
    setPlaying(true);

    audioRef.current.play();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // 监听 playing 变化，从而控制 audio 标签播放和暂停
  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  /**
   * 获取歌词，初识化Lyric 插件
   * @param id
   */
  const getLyric = async (id: number) => {
    const { lrc } = await getLyricRequest(id);
    transformToLyricLines(lrc.lyric);
  };

  /**
   * 把原始字符串形式的歌词解析成歌词行
   * @param lrc
   */
  const transformToLyricLines = (lrc: string) => {
    const lines = lrc.split("\n");
    const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
    const lyricList: LyricLineType[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]; // 如 "[00:01.997] 作词：薛之谦"
      const result = timeExp.exec(line);
      if (!result) continue;

      const txt = line.replace(timeExp, "").trim(); // 现在把时间戳去掉，只剩下歌词文本

      if (txt) {
        if (result[3].length === 3) {
          result[3] = Number(result[3]) / 10 + ""; // [00:01.997] 中匹配到的 997 就会被切成 99
        }

        // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
        lyricList.push({
          time: Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + (Number(result[3]) || 0) * 10,
          txt,
        });
      }
    }

    lyricList.sort((a, b) => {
      return a.time - b.time;
    }); // 根据时间排序

    setLyricLines(lyricList);
  };

  /**
   * 获取音乐播放的进度
   * 设置已经播放的时间
   * 设置百分比
   * @param e
   */
  const updateTime = (e: SyntheticEvent<HTMLAudioElement>) => {
    const audioElement = e.target as HTMLAudioElement;
    const currentTime = audioElement.currentTime;

    setCurrentTime(currentTime);
    setPercent(getPercent(currentTime, duration));
  };

  /**
   * 根据已播放时间和总时长计算歌曲百分比进度
   * @param currentTime
   * @param duration
   * @returns
   */
  const getPercent = (currentTime: number, duration: number) => {
    return Number.isNaN(currentTime / duration) ? 0 : currentTime / duration;
  };

  /**
   * 当进度条被点击、滑动时，currentTime 也应该跟着变
   * @param percent
   */
  const setSongProgress = (percent: number) => {
    const newTime = percent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;

    // 设置歌词进度
    // lyricRef.current.seek(newTime * 1000);

    // 如果进度条被滑动时，歌曲处于暂停状态，则把状态置为播放
    if (!playing) {
      setPlaying(true);
    }
  };

  /**
   * 循环播放
   */
  const loopHandler = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    audioRef.current.play();
    setPlaying(true);
  };

  /**
   * 点击上一曲
   * @returns
   */
  const prevHandler = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = playList.length - 1;
    setCurrentIndex(newIndex);
  };

  /**
   * 点击下一曲
   * @returns
   */
  const nextHandler = () => {
    let newIndex = currentIndex + 1;
    if (newIndex > playList.length - 1) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  /**
   * 播放完毕之后
   */
  const endHandler = () => {
    if (playMode === PlayMode.LOOP) {
      loopHandler();
    } else {
      nextHandler();
    }
  };

  /**
   * 播放出错提示
   */
  const errorHandler = () => {
    setPlaying(false);
    alert("播放出错，歌曲收费！");
  };

  return (
    <div className={styles.player}>
      <PlayerBanner song={currentSong} />
      <SongContext.Provider value={{ setSongProgress }}>
        <FullScreenPlayer
          song={currentSong}
          currentTime={currentTime}
          duration={duration}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          togglePlayMode={togglePlayMode}
          lyricLines={lyricLines}
        />
      </SongContext.Provider>
      <PlayList />
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={endHandler} onError={errorHandler}></audio>
    </div>
  );
};

export default Player;
